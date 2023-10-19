using GGames.Models.Attributes;
using GGames.Models.DBModels.Tables;
using System.ComponentModel.DataAnnotations;

namespace GGames.Models.DBModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [AdminName]
        public string? Name { get; set; }
        public string? Password { get; set; }
        public ICollection<Game> Games { get; set; }
        public User()
        {
            Games = new List<Game>();
        }
    }
}
