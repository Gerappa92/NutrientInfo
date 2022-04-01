using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Infrastructure.Contracts.AzureTables
{
    public class MealEntity : AzureTable
    {
        public MealEntity()
        {

        }

        public MealEntity(Domain.Entities.Meal meal)
        {
            Id = meal.Id;
            RowKey = meal.Id;
            PartitionKey = meal.Author;
            Name = meal.Name;
            Description = meal.Description;
            Author = meal.Author;
            CreationDate = meal.CreationDate;
            ETag = Azure.ETag.All;
            SetIngredients(meal.Ingredients);
        }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime CreationDate { get; set; }
        public string IngredientsJson { get; set; }

        public IEnumerable<Domain.Entities.Ingredient> GetIngredients() => JsonConvert.DeserializeObject<IEnumerable<Domain.Entities.Ingredient>>(IngredientsJson);

        public void SetIngredients(IEnumerable<Domain.Entities.Ingredient> ingredients)
        {
            IngredientsJson = JsonConvert.SerializeObject(ingredients);
        }

        public Domain.Entities.Meal Map()
        {
            var meal = new Domain.Entities.Meal
            {
                Id = Id,
                Name = Name,
                Description = Description,
                Author = Author,
                CreationDate = CreationDate
            };
            meal.Ingredients = GetIngredients();
            return meal;
        }
    }
}
