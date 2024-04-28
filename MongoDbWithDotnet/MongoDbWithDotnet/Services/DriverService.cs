using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDbWithDotnet.Configurations;
using MongoDbWithDotnet.Models;

namespace MongoDbWithDotnet.Services
{
    public class DriverService
    {
        private readonly IMongoCollection<Driver> _driversCollection;

        public DriverService(IOptions<DatabaseSettings> databaseSettings)
        {
            // intialize the mongo client
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);

            // connect to the MongoDb database
            var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            // connect to the mongo db collection
            _driversCollection = mongoDb.GetCollection<Driver>(databaseSettings.Value.CollectionName);
        }

        // Find provided a filter using lambda function _ => true to get me everything from the collection
        public async Task<List<Driver>> GetAsync() =>
            await _driversCollection.Find(_ => true).ToListAsync();
    }
}
