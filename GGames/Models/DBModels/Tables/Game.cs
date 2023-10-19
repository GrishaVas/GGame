using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.IO;
using GGames.Models.Attributes;

namespace GGames.Models.DBModels.Tables
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        [AdminName]
        public string? Name { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? Date { get; set; }
        public string? Platform { get; set; }
        public int Price { get; set; }
        public string? ImagesPath { get; set; }
        public string? DescParag { get; set; }
        public string? Description  { get; set; }
        public ICollection<GameRequirements> GameRequirements { get; set; }
        public ICollection<GameCategory> GameCategories { get; set; }
        public ICollection<User> Users { get; set; }
        public Game()
        {
            GameRequirements = new List<GameRequirements>();
            GameCategories = new List<GameCategory>();
            Users = new List<User>();
        }
        public string GetIcon()
        {
            return Directory.GetFiles($"wwwroot/images/games/{this.ImagesPath}/icon/")[0].Substring(7);
        }
        public string GetMainImg()
        {
            return Directory.GetFiles($"wwwroot/images/games/{this.ImagesPath}/main image/")[0].Substring(7);
        }
        public string GetSlideShowImg()
        {
            DirectoryInfo directoryInfo = new DirectoryInfo($"wwwroot/images/games/{this.ImagesPath}/gallery/");
            return $"/images/games/{this.ImagesPath}/gallery/" + directoryInfo.GetFiles().Where(x => x.Name == $"SlideShowImage{x.Extension}").First().Name;
        }
        public List<string> GetGallery()
        {
            DirectoryInfo directoryInfo = new DirectoryInfo($"wwwroot/images/games/{this.ImagesPath}/gallery/");
            List<string> gallery = new List<string>();
            foreach (var item in directoryInfo.GetFiles())
            {
                gallery.Add($"/images/games/{this.ImagesPath}/gallery/"+item.Name);
            }
            return gallery;
        }
        public GameRequirements GetRequirements(string type)
        {
            GameRequirements gameRequirements = this.GameRequirements.First();
            if (gameRequirements.Type == type)
            {
                return gameRequirements;
            }
            else return this.GameRequirements.Last();
        }
    }
}
