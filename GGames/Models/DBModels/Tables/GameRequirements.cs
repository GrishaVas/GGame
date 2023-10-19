using GGames.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GGames.Models.DBModels.Tables
{
    public class GameRequirements
    {
        [Key]
        [AdminName]
        public int Id { get; set; }
        public string? Type { get; set; }
        public string? OS { get; set; }
        public string? Processor { get; set; }
        public string? Ram { get; set; }
        public string? GraphicsCard { get; set; }
        public string? Memory { get; set; }
        public Game? Game { get; set; }
    }
}
