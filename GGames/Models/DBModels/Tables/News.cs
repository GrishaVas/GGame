using GGames.Models.Attributes;
using System.ComponentModel.DataAnnotations;

namespace GGames.Models.DBModels.Tables
{
    public class News
    {
        [Key]
        public int Id { get; set; }
        [AdminName]
        public string? Name { get; set; }
        public string? ImagesPath { get; set; }
        public ICollection<NewsDescParagraph>? NewsDescParagraphs { get; set; }

        public string GetMainImg()
        {
            string result = Directory.GetFiles($"wwwroot/images/news/n_{this.Id}/main image/").First().Substring(7);
            return result;
        }

        public string GetHeaderImg()
        { 
            string result = Directory.GetFiles($"wwwroot/images/news/n_{this.Id}/header image/").First().Substring(7);
            return result;
        }
        public List<string> GetDescImgs()
        {
            List<string> result = new List<string>();
            if (Directory.Exists($"wwwroot/images/news/n_{this.Id}/images/"))
            {
                foreach (var file in Directory.GetFiles($"wwwroot/images/news/n_{this.Id}/images/"))
                {
                    result.Add(file.Substring(7));
                }
            }
            return result;
        }
    }
}
