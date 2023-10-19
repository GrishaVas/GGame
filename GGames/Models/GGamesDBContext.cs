using GGames.Models.DBModels;
using GGames.Models.DBModels.Tables;
using Microsoft.EntityFrameworkCore;

namespace GGames.Models
{
    public class GGamesDBContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<GameRequirements> GameRequirements { get; set; }
        public DbSet<GameCategory> GameCategories { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsDescParagraph> NewsDescParagraphs { get; set; }
        public GGamesDBContext(DbContextOptions<GGamesDBContext> options):base(options)
        {
            this.Database.EnsureCreated();
        }
    }
}
