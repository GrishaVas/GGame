using GGames.Models;
using GGames.Models.Attributes;
using GGames.Models.DBModels.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace GGames.Controllers
{
    public class AdminController : Controller
    {
        private GGamesDBContext db;
        public AdminController(GGamesDBContext db)
        {
            this.db = db;   
        }
        [HttpGet]
        public IActionResult Index(string table)
        {
            ViewData["Table"] = table;
            return View(db);
        }
        [HttpPost]
        public IActionResult Add(string table, params string[] parameters)
        {
            int index = 0;
            object obj = typeof(GGamesDBContext).GetProperty(table).GetValue(db);
            object addObj = obj.GetType().GetGenericArguments()[0].GetConstructor(new Type[] {}).Invoke(new object[] { });
            foreach (var item in addObj.GetType().GetProperties())
            {
                if (item.PropertyType.Name!= "ICollection`1")
                {
                    object o = Convert.ChangeType(parameters[index], item.PropertyType);
                    item.SetValue(addObj,o);
                }
                else
                {
                    //db.GameRequirements.
                    Type type = item.PropertyType.GetGenericArguments()[0]; //GameRequirements
                    PropertyInfo prop = type.GetProperties().FirstOrDefault(x=> Attribute.GetCustomAttribute(x, typeof(AdminName)) != null);//Id
                    IQueryable<object> objs = (IQueryable<object>)typeof(GGamesDBContext).GetProperty(item.Name).GetValue(db);//DbSet Gamerequirements
                    //item.PropertyType.GetMethod("Add").Invoke(item.GetValue(addObj), new object[] { objs.FirstOrDefault(x => prop.GetValue(x).ToString() == parameters[index]) });

                    foreach (var item1 in objs)
                    {
                        //Convert.ChangeType(prop.GetValue(item1), prop.PropertyType)
                        object Obj = prop.GetValue(item1);

                        if (parameters[index] == Obj.ToString())
                        {
                            item.PropertyType.GetMethod("Add").Invoke(item.GetValue(addObj), new object[] { item1 });
                        }

                    }
                }
                index++;
            }
            Game game = new Game() { Id = 6 };

            object r = obj.GetType().GetMethod("Add").Invoke(obj,new object[] { addObj });
            ////obj = typeof(GGamesDBContext).GetProperty(table).GetValue(db);
            //db.Games.Add(game);
            //game.GameRequirements.Add(db.GameRequirements.First());
            ////game.GameCategories.Add(db.GameCategories.First());
            ////game.Users.Add(db.Users.First());
            db.SaveChanges();
            return RedirectToAction("Index",new {table = table});
        }
        [HttpPost]
        public IActionResult Delete(string table, params string[] parameters)
        {
            ViewData["Table"] = table;
            return View(db);
        }
    }
}
