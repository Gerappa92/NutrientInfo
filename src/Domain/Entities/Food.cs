using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class Food
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BrandOwner { get; set; }
        public string BrandName { get; set; }
        public List<NutrientItem> Nutrients { get; set; } = new List<NutrientItem>();
        public string DataSourceName { get; set; }
        public List<FoodTag> FoodTags { get; private set; } = new List<FoodTag>();

        public void AddFoodTags(IEnumerable<FoodTag> foodTags)
        {
            FoodTags = foodTags.ToList();
        }
    }
}
