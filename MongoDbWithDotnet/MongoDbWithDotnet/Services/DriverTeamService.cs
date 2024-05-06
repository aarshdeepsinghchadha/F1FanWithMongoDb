using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDbWithDotnet.Configurations;
using MongoDbWithDotnet.Models;
using MongoDbWithDotnet.Models.ViewModels;

namespace MongoDbWithDotnet.Services
{
    public class DriverTeamService
    {
        private readonly IMongoCollection<DriverTeam> _driverTeamCollection;

        public DriverTeamService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _driverTeamCollection = mongoDb.GetCollection<DriverTeam>("DriverTeam");
        }

        private async Task<List<DriverTeam>> GetDriverTeamAsync()
        {
            return await _driverTeamCollection.Find(_ => true).ToListAsync();
        }

        public async Task<DriverTeam> GetDriverTeamById(string id)
        {
            var filter = Builders<DriverTeam>.Filter.Eq(x => x.Id, id);
            var driverTeam = await _driverTeamCollection.FindAsync(filter);
            return driverTeam.FirstOrDefault();
        }

        public async Task<bool> AddDriverTeam(AddDriverTeamDto addDriverTeamDto)
        {
            // Basic validation example
            if (string.IsNullOrEmpty(addDriverTeamDto.TeamName))
            {
                throw new ArgumentException("Team Name is required.");
            }

            try
            {
                var newTeam = new DriverTeam
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    TeamName = addDriverTeamDto.TeamName
                };
                await _driverTeamCollection.InsertOneAsync(newTeam);
                return true;
            }
            catch(MongoException ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdateDriverTeam(string id, EditDriverTeamDto updateDriverTeamDto) 
        {
            var filter = Builders<DriverTeam>.Filter.Eq(x=>x.Id, id);
            var update = Builders<DriverTeam>.Update
                .Set(x => x.TeamName, updateDriverTeamDto.TeamName);

            var updateResult = await _driverTeamCollection.UpdateOneAsync(filter, update).ConfigureAwait(false);
            return updateResult.IsAcknowledged  &&  updateResult.ModifiedCount > 0;
        }

        public async Task<bool> DeleteDriverTeam(string id)
        {
            var filter = Builders<DriverTeam>.Filter.Eq(x => x.Id, id);
            var deleteResult = await _driverTeamCollection.DeleteOneAsync(filter).ConfigureAwait(false);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;    
        }

        public async Task<List<DriverTeam>> FindTeam(string? searchTerm)
        {
            if(string.IsNullOrEmpty(searchTerm))
            {
                return await _driverTeamCollection.Find(_ => true).ToListAsync();
            }

            var filter = Builders<DriverTeam>.Filter.Regex(x => x.TeamName, new BsonRegularExpression($"/{searchTerm}/i"));
            var teamList = await _driverTeamCollection.Find(filter).ToListAsync();
            return teamList;
        }

    }
}
