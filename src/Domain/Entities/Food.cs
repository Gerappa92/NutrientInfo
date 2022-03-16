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
        public List<FoodTag> FoodTags { get; protected set; } = new List<FoodTag>();

        public void SetDetails(IEnumerable<DailyValue> dailyValues, IEnumerable<FoodTag> tags)
        {
            SetNutrientsDailyValues(dailyValues);
            SetFoodTags(tags);
        }

        private void SetNutrientsDailyValues(IEnumerable<DailyValue> dailyValues)
        {
            foreach (var nutrient in Nutrients)
            {
                var recommendedDailyValue = dailyValues.FirstOrDefault(d => d.Id == nutrient.Id);
                if (recommendedDailyValue != null)
                {
                    nutrient.CalcDailyValuePercentage(recommendedDailyValue.Value);
                }
            }
        }

        private void SetFoodTags(IEnumerable<FoodTag> tags)
        {
            if (IsNoNutrients())
            {
                return;
            }

            FoodTags = MatchTagsWithNutrients(tags);
        }

        private bool IsNoNutrients() => !Nutrients.Any();

        private List<FoodTag> MatchTagsWithNutrients(IEnumerable<FoodTag> tags)
        {
            var filteredTags = new List<FoodTag>();

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

            return filteredTags;
        }
    }
}
