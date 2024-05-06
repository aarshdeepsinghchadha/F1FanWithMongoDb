using MongoDB.Bson.Serialization.Attributes;

namespace MongoDbWithDotnet.Models
{
    public class DriverTeam
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("TeamName")]
        public string TeamName { get; set; } = string.Empty;
    }
}
