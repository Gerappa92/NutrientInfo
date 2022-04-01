using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System.Linq;

namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class MealTests
    {
        private User _user;
        private const string _userEmail = "a@b.com";

        [SetUp]
        public void Setup()
        {
            _user = new User();
        }

        [Test]
        public void NewMeal_Should_HaveSetCeationDate()
        {
            var meal = new Meal("mealName", _userEmail);
            Assert.IsNotNull(meal.CreationDate);
        }

        [Test]
        public void NewMeal_Should_HaveSetId()
        {
            var meal = new Meal("mealName", _userEmail);
            Assert.IsNotNull(meal.Id);
            Assert.IsNotEmpty(meal.Id);
        }

        [Test]
        public void AddUniqueIngredients_Should_AddOnlyUniqueIngrediens()
        {
            var potato1 = CreateIngredient("1", "Potato", 1);
            var potato2 = CreateIngredient("1", "Potato", 2);
            var ingredients = new Ingredient[] { potato1, potato2 };

            var meal = new Meal("Name", _userEmail);
            meal.AddUniqueIngredients(ingredients);


            meal.Ingredients.Should().HaveCount(1);
        }

        [Test]
        public void GroupNutrients_Should_SumsTheSameNutrientsValues()
        {
            var potato = CreateIngredient("1", "Potato", 100);
            potato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var tomato = CreateIngredient("2", "Tomato", 100);
            tomato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var ingredients = new Ingredient[] { potato, tomato };
            var meal = new Meal("Name", _userEmail);
            meal.AddUniqueIngredients(ingredients);

            var mealNutrients = meal.GroupNutrients();

            mealNutrients.First(n => n.Name == "Sugar").Value.Should().Be(20);
        }

        [Test]
        public void GroupNutrients_Should_ReturnOnlyUniqueNutrients()
        {
            var potato = CreateIngredient("1", "Potato", 100);
            potato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var tomato = CreateIngredient("2", "Tomato", 100);
            tomato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var ingredients = new Ingredient[] { potato, tomato };
            var meal = new Meal("Name", _userEmail);
            meal.AddUniqueIngredients(ingredients);

            var mealNutrients = meal.GroupNutrients();

            mealNutrients.Should().HaveCount(1);
        }

        [Test]
        public void GroupNutrients_Should_ReturnEmptyList_WhenThereAreNoIngredients()
        {
            var ingredients = new Ingredient[0];
            var meal = new Meal("Name", _userEmail);
            meal.AddUniqueIngredients(ingredients);

            var mealNutrients = meal.GroupNutrients();

            mealNutrients.Should().HaveCount(0);
        }

        [Test]
        public void CleanIngredients_Shold_SetEmptyArrayToIngredietns()
        {
            var ingredient1 = CreateIngredient("1", "ingredient", 100);
            var meal = new Meal("Meal", _userEmail);
            meal.AddUniqueIngredients(new Ingredient[] { ingredient1 });

            meal.CleanIngredients();

            Assert.Zero(meal.Ingredients.Count());
        }

        private Ingredient CreateIngredient(string id, string name, float amount)
        {
            var potato = new Food()
            {
                Id = id,
                Name = name,
                BrandName = "BrandName",
                BrandOwner = "BrandOwner"
            };

            var ingredient = new Ingredient(potato, amount);
            return ingredient;
        }

        private NutrientItem CreateNutrient(string id, string name, float value)
        {
            return new NutrientItem()
            {
                Id = id,
                Name = name,
                Value = value
            };
        }
    }
}
