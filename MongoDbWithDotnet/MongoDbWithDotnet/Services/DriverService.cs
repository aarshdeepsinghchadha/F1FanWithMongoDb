using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDbWithDotnet.Configurations;
using MongoDbWithDotnet.Models;
using MongoDbWithDotnet.Models.ViewModels;

namespace MongoDbWithDotnet.Services
{
    public class DriverService
    {
        private readonly IMongoCollection<Driver> _driversCollection;
        private readonly IMongoCollection<DriverTeam> _driverTeamCollection;

        public DriverService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _driversCollection = GetCollection<Driver>(mongoDb, databaseSettings.Value.CollectionName);
            _driverTeamCollection = GetCollection<DriverTeam>(mongoDb, "DriverTeam");
        }

        private IMongoCollection<T> GetCollection<T>(IMongoDatabase database, string collectionName)
        {
            return database.GetCollection<T>(collectionName);
        }


        // Find provided a filter using lambda function _ => true to get me everything from the collection
        public async Task<List<Driver>> GetAsync() =>
            await _driversCollection.Find(_ => true).ToListAsync();

        public async Task<Driver> GetDriverById(string id)
        {
            // Use Filter Builder for clarity and type safety
            var filter = Builders<Driver>.Filter.Eq(d=>d.Id,id);

            // Find the driver wiht the matching Id
            var driver = await _driversCollection.FindAsync(filter);

            // Return the first matching driver, or null if not found
            return driver.FirstOrDefault();
        }

        public async Task<bool> AddDriver(AddDriverDto driver)
        {
            // Basic validation example
            if (string.IsNullOrEmpty(driver.Name))
            {
                throw new ArgumentException("Name is required.");
            }

            try
            {
                var newDriver = new Driver
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Name = driver.Name,
                    Number = driver.Number,
                    TeamId = driver.TeamId
                };
                await _driversCollection.InsertOneAsync(newDriver);
                return true;
            }
            catch (MongoException ex)
            {
                return false;
            }
        }


        public async Task<bool> UpdateDriver(string id,EditDriverDto driver)
        {
            // Use Filter Builders for clarity and type safety
            var filter = Builders<Driver>.Filter.Eq(d => d.Id, id);

            // Update document using UpdateDefinition Builders
            var update = Builders<Driver>.Update
                .Set(d => d.Name, driver.Name) // Update Name
                .Set(d => d.Number, driver.Number) // Update Number
                .Set(d => d.TeamId, driver.TeamId);  // Update TeamId

            // UpdateOneAsync to update the first matching document
            var updateResult = await _driversCollection.UpdateOneAsync(filter, update);

            // Return true if at least one document was modified
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }


        public async Task<bool> DeleteDriver(string id)
        {
            // Use Filter Builders for clarity and type safety
            var filter = Builders<Driver>.Filter.Eq(d => d.Id, id);

            // DeleteOneAsync to delete the first matching document
            var deleteResult = await _driversCollection.DeleteOneAsync(filter);

            // Return true if at least one document was deleted
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        public async Task<List<GetDriversListDto>> FindDrivers(string? searchTerm)
        {
            if (searchTerm == null)
            {
                var drivers = await _driversCollection.Find(_ => true).ToListAsync();
                return await MapDriversToDto(drivers);
            }

            int driverNumber;
            if (int.TryParse(searchTerm, out driverNumber))
            {
                // Search by driver number
                var filter = Builders<Driver>.Filter.Eq(d => d.Number, driverNumber);
                var drivers = await _driversCollection.Find(filter).ToListAsync();
                return await MapDriversToDto(drivers);
            }
            else
            {
                // Search by name and team (assuming searchTerm is not a number)
                var teamFilter = Builders<DriverTeam>.Filter.Regex(d => d.TeamName, new BsonRegularExpression($"/{searchTerm}/i"));
                var teamIds = await _driverTeamCollection.Find(teamFilter).Project(d => d.Id).ToListAsync();

                var filter = Builders<Driver>.Filter.Or(
                    Builders<Driver>.Filter.Regex(d => d.Name, new BsonRegularExpression($"/{searchTerm}/i")),
                    Builders<Driver>.Filter.In(d => d.TeamId, teamIds)
                );

                var drivers = await _driversCollection.Find(filter).ToListAsync();
                return await MapDriversToDto(drivers);
            }
        }

        private async Task<List<GetDriversListDto>> MapDriversToDto(List<Driver> drivers)
        {
            var result = new List<GetDriversListDto>();

            foreach (var driver in drivers)
            {
                var team = await _driverTeamCollection.Find(dt => dt.Id == driver.TeamId).FirstOrDefaultAsync();
                var teamName = team != null ? team.TeamName : "Unknown";
                result.Add(new GetDriversListDto
                {
                    Id = driver.Id,
                    Name = driver.Name,
                    Number = driver.Number,
                    Team = teamName
                });
            }

            return result;
        }
    }
}
