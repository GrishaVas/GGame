using GGames.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GGames.Models.DBModels.Tables
{
    public class GameCategory
    {
        [Key]
        public int Id { get; set; }
        [AdminName]
        public string? CategoryName { get; set; }
        public ICollection<Game>? Games { get; set; }
    }
}
