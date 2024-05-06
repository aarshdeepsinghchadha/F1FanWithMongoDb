using MongoDB.Bson.Serialization.Attributes;

namespace MongoDbWithDotnet.Models.ViewModels
{
    public class EditDriverTeamDto
    {
        [BsonElement("TeamName")]
        public string TeamName { get; set; } = string.Empty;
    }
}
