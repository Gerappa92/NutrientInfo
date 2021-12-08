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

        public void SetFoodTags(IEnumerable<FoodTag> tags)
        {
            if (Nutrients.Count() == 0 || tags.Count() == 0)
            {
                return;
            }

            var filteredTags = new List<Domain.Entities.FoodTag>();

            foreach (var tag in tags)
            {
                var nutrient = Nutrients.FirstOrDefault(n => n.Id == tag.NutrientId);
                if (nutrient is null)
                {
                    continue;
                }

                if (tag.MinDailyValuePercentage <= nutrient.DailyValuePercentage
                    && tag.MaxDailyValuePercentage >= nutrient.DailyValuePercentage)
                {
                    filteredTags.Add(tag);
                }
            }

            FoodTags = filteredTags.ToList();
        }
    }
}
