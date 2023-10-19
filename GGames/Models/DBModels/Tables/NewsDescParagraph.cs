using GGames.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GGames.Models.DBModels.Tables
{
    public class NewsDescParagraph
    {
        [Key]
        [AdminName]
        public int Id { get; set; }
        public string? Header { get; set; }
        public string? Body { get; set; }
        public News? News { get; set; }
    }
}
