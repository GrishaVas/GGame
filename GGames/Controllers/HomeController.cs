using GGames.Models;
using GGames.Models.DBModels;
using GGames.Models.DBModels.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;

namespace GGames.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private GGamesDBContext db;

        public HomeController(ILogger<HomeController> logger, GGamesDBContext db)
        {
            _logger = logger;
            this.db = db; 
        }

        public IActionResult Index()
        {
            return View(db.Games.ToList());
        }
        [HttpGet]
        public IActionResult Game(string name)
        {
            Game game = db.Games.Include(x => x.GameRequirements).Where(x=>x.Name == name).First();
            ViewData["DBContext"] = db;
            return View(game);
        }

        public IActionResult Shop()
        {
            List<Game> games = db.Games.ToList();
            ViewData["Categories"] = db.GameCategories.ToList();
            return View(games);
        }
        public IActionResult BuyGame(string name)
        {
            Game game = db.Games.Where(x => x.Name == name).First();
            return View(game);
        }
        public IActionResult Payment(string gameName)
        {
            string userName = HttpContext.User.Claims.Where(y => y.Type == ClaimTypes.Name).First().Value;
            User user = db.Users.Include(x=>x.Games).Where(x => x.Name == userName).First();
            user.Games.Add(db.Games.Where(x => x.Name == gameName).First());
            db.SaveChanges();
            return RedirectToAction("Game",new {name = gameName });
        }
        public IActionResult News()
        {
            List<News> news = db.News.ToList();
            return View(news);
        }
        [HttpGet]
        public IActionResult AboutNews(string name)
        {
            News news = db.News.Include(x=>x.NewsDescParagraphs).Where(x=>x.Name == name).First();
            return View(news);
        }

        [HttpPost]
        public IActionResult Shop_Filters(string platform, string price, string category, string search, string load)
        {
            List<Game> games = db.Games.ToList();
            if (search != null)
            {
                games = db.Games.Where(x => x.Name.ToLower().Contains(search.ToLower()) == true).ToList();
            }
            if (category != null)
            {
                games = db.Games.Include(x => x.GameCategories).Where(x => x.GameCategories.Where(y => y.CategoryName == category).Count() > 0).ToList();
            }
            if (platform != null)
            {
                games = games.Where(x => x.Platform.Contains(platform)).ToList();
            }
            switch (price)
            {
                case "0":
                        games = games.Where(x => x.Price == 0).ToList();
                        break;

                case "<50":
                        games = games.Where(x => x.Price < 50).ToList();
                        break;

                case "<100":
                        games = games.Where(x => x.Price < 100).ToList();
                        break;

                case ">100":
                        games = games.Where(x => x.Price >= 100).ToList();
                        break;
            }
            return View(games);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}