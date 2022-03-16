using Application.Common.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Services
{
    public class MealCalculator : IMealCalculator
    {
        public IEnumerable<NutrientItem> CalculateNutrients(IEnumerable<Ingredient> ingredients)
        {
            if(ingredients == null || ingredients.Any() == false)
            {
                return new NutrientItem[0];
            }

            var nutrients = ingredients.SelectMany(i => i.Nutrients);

            var nutrientsGrouped = nutrients
                .GroupBy(
                    n => n.Id, 
                    (id, n) => new NutrientItem(n.First(), n.Sum(p => p.Value))
                );
            return nutrientsGrouped;
        }
    }
}
