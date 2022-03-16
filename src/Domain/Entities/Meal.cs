using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class Meal
    {
        public Meal(string name, string author)
        { 
            Name = name;
            Author = author;
        }

        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Author { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public HashSet<Ingredient> Ingredients { get; set; } = new HashSet<Ingredient>();
        

        public void AddIngredients(IEnumerable<Ingredient> ingredients)
        {
            foreach (var ingredient in ingredients)
            {
                Ingredients.Add(ingredient);
            }
        }

        public IEnumerable<NutrientItem> GroupNutrients()
        {
            var groupedNutrients = Ingredients
                .SelectMany(i => i.Nutrients)
                .GroupBy(n => n.Id)
                .Select(n => new NutrientItem(n.First(), n.Sum(s => s.Value)));

            return groupedNutrients;
        }
    }
}
