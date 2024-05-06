using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDbWithDotnet.Models.ViewModels
{
    public class EditDriverDto
    {
        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;
        [BsonElement("Number")]
        public int Number { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string TeamId { get; set; }
    }
}
