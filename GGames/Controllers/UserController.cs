using GGames.Models;
using GGames.Models.DBModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authentication;

namespace GGames.Controllers
{
    public class UserController : Controller
    {
        private GGamesDBContext db;

        public UserController(GGamesDBContext db)
        {
            this.db = db;
        }

        public IActionResult Authentication()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ChangeName()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ChangeNamePost(string newname, string password)
        {
            Regex regexName = new Regex(@"^[\wА-я]{1,10}$");
            string oldname = HttpContext.User.Claims.Where(y => y.Type == ClaimTypes.Name).First().Value;
            User dbUser = db.Users.Where(x => x.Name == oldname).First();
            if (newname != null)
            {
                if (regexName.IsMatch(newname))
                {
                    if (dbUser.Password == password)
                    {
                        if (!db.Users.Where(x => x.Name == newname).Any())
                        {
                            db.Users.Where(x => x.Name == dbUser.Name && x.Password == password).First().Name = newname;
                            db.SaveChanges();

                            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                            var claims = new List<Claim> { new Claim(ClaimTypes.Name, newname) };
                            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Cookies");
                            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                            return Content("succes");
                        }
                        else
                        {
                            return Content("fail_name");
                        }

                    }
                    else
                    {
                        return Content("fail_password");
                    }
                }
                else return Content("fail_name");
            }
            else
                return Content("fail_name");
        }
        public IActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(User user)
        {
            if (db.Users.Where(x => x.Name == user.Name && x.Password == user.Password).Count()>0)
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Name) };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Cookies");
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                return Content("succes");
            }
            else
            if (db.Users.Where(x => x.Name == user.Name).Any())
            {
                return Content("fail_password");
            }
            else
                return Content("fail_name");
        }
        [HttpPost]
        public IActionResult CreateUser(User user, string rPassword)
        {
            Regex regexPass = new Regex(@"^[\wА-я]{8,40}$");
            Regex regexName = new Regex(@"^[\wА-я]{1,10}$");
            if (user.Name != null)
            {
                if (!db.Users.Where(x => x.Name == user.Name).Any() && regexName.IsMatch(user.Name))
                {
                    if (user.Password != null)
                    {

                        if (user.Password == rPassword && regexPass.IsMatch(user.Password))
                        {
                            db.Users.Add(user);
                            db.SaveChanges();

                            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Name) };
                            // создаем объект ClaimsIdentity
                            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Cookies");
                            // установка аутентификационных куки
                            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                            return Content("succes");
                        }
                        else return Content("fail_password");

                    }
                    else return Content("fail_password");
                }
                else return Content("fail_name");
            }
            else return Content("fail_name");
        }
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Redirect("/Home/Index");
        }
    }
}
