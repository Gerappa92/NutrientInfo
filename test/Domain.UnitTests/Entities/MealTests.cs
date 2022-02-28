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

        [SetUp]
        public void Setup()
        {
            _user = new User();
        }

        [Test]
        public void AddIngriedients_Should_AddOnlyUniqueIngriediens()
        {
            var potato1 = CreateIngredient("1", "Potato", 1);
            var potato2 = CreateIngredient("1", "Potato", 2);
            var ingriedients = new Ingriedient[] { potato1, potato2 };

            var meal = new Meal("Name", _user, ingriedients);

            meal.Ingriedients.Should().HaveCount(1);
        }

        [Test]
        public void GroupNutrients_Should_SumsTheSameNutrientsValues()
        {
            var potato = CreateIngredient("1", "Potato", 100);
            potato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var tomato = CreateIngredient("2", "Tomato", 100);
            tomato.Nutrients.Add(CreateNutrient("1", "Sugar", 10));
            var ingriedients = new Ingriedient[] { potato, tomato };
            var meal = new Meal("Name", _user, ingriedients);

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
            var ingriedients = new Ingriedient[] { potato, tomato };
            var meal = new Meal("Name", _user, ingriedients);

            var mealNutrients = meal.GroupNutrients();

            mealNutrients.Should().HaveCount(1);
        }

        [Test]
        public void GroupNutrients_Should_ShouldReturnEmptyListWhenThereAreNoIngriedients()
        {
            var ingriedients = new Ingriedient[0];
            var meal = new Meal("Name", _user, ingriedients);

            var mealNutrients = meal.GroupNutrients();

            mealNutrients.Should().HaveCount(0);
        }

        private Ingriedient CreateIngredient(string id, string name, float amount)
        {
            var potato = new Food()
            {
                Id = id,
                Name = name,
                BrandName = "BrandName",
                BrandOwner = "BrandOwner"
            };

            var ingriedient = new Ingriedient(potato, amount);
            return ingriedient;
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
