using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class Meal
    {
        public Meal()
        {

        }

        public Meal(string name, string author)
        { 
            Id = Guid.NewGuid().ToString();
            CreationDate = DateTime.UtcNow;
            Name = name;
            Author = author;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime CreationDate { get; set; }
        public IEnumerable<Ingredient> Ingredients { get; set; } = new HashSet<Ingredient>();

        public void AddUniqueIngredients(IEnumerable<Ingredient> ingredients)
        {
            var ingredientsHashSet = new HashSet<Ingredient>();
            foreach (var ingredient in ingredients)
            {
                ingredientsHashSet.Add(ingredient);
            }
            Ingredients = ingredientsHashSet;
        }

        public IEnumerable<NutrientItem> GroupNutrients()
        {
            var groupedNutrients = Ingredients
                .SelectMany(i => i.Nutrients)
                .GroupBy(n => n.Id)
                .Select(n => new NutrientItem(n.First(), n.Sum(s => s.Value)));

            return groupedNutrients;
        }

        public void CleanIngredients()
        {
            Ingredients = new Ingredient[0];
        }

        public void SetDescription(string description)
        {
            Description = description;
        }
    }
}
