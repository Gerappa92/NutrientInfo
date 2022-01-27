using Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UnitTests.Entities
{
    [TestFixture]
    public class FoodTests
    {
        private Food _food;
        private List<NutrientItem> _nutrients;
        private List<DailyValue> _dailyValues;
        private List<FoodTag> _foodTags;
        private string _sugarId = "1";

        [SetUp]
        public void Setup()
        {
            _food = new Food();
            _nutrients = new List<NutrientItem>();
            _dailyValues = new List<DailyValue>();
            _foodTags = new List<FoodTag>();
        }

        [Test]
        public void SetDetails_Should_NotThrowException_When_ThereIsNoNutrients()
        {
            _food.SetDetails(_dailyValues, _foodTags);
            Assert.IsTrue(true);
        }

        [Test]
        [TestCase(0, NutrientItemStatus.Neutral)]
        [TestCase(50f, NutrientItemStatus.Good)]
        [TestCase(100f, NutrientItemStatus.Warning)]
        [TestCase(150f, NutrientItemStatus.Bad)]
        public void SetDetails_Should_SetStatus_When_MatchCriteria(float value, NutrientItemStatus result)
        {
            AddSugar(value);
            AddSugarRecommendation(100);

            _food.Nutrients = _nutrients;
            _food.SetDetails(_dailyValues, _foodTags);

            _food.Nutrients.Find(n => n.Id == _sugarId).Status.Should().Be(result.ToString());
        }

        

        [Test]
        public void SetDetails_Should_SetNeutralStatus_When_ThereIsNoRecommendedValue()
        {
            AddSugar(10);

            _food.SetDetails(_dailyValues, _foodTags);

            _food.Nutrients.Find(n => n.Id == _sugarId).Status.Should().Be(NutrientItemStatus.Neutral.ToString());
        }

        

        [Test]
        public void SetDetails_Should_SetLowSugarTag()
        {
            AddSugar(1);
            AddSugarRecommendation(100);
            var lowSugar = AddLowSugarTag();
            AddHighSugarTag();

            _food.SetDetails(_dailyValues, _foodTags);

            _food.FoodTags.Should().HaveCount(1);
            _food.FoodTags.First().Should().BeEquivalentTo(lowSugar);
        }

        [Test]
        public void SetDetails_Should_SetHighSugarTag()
        {
            AddSugar(101);
            AddSugarRecommendation(100);
            AddLowSugarTag();
            var highSugar = AddHighSugarTag();

            _food.SetDetails(_dailyValues, _foodTags);

            _food.FoodTags.Should().HaveCount(1);
            _food.FoodTags.First().Should().BeEquivalentTo(highSugar);
        }

        [Test]
        public void SetDetails_Should_NotReturnTag()
        {
            AddSugar(10);
            AddSugarRecommendation(100);
            AddLowSugarTag();
            AddHighSugarTag();

            _food.SetDetails(_dailyValues, _foodTags);

            _food.FoodTags.Should().HaveCount(0);
        }

        private void AddSugar(float value)
        {
            var nutrient = new NutrientItem()
            {
                Id = _sugarId,
                Name = "Sugar",
                Value = value
            };
            _nutrients.Add(nutrient);
            _food.Nutrients = _nutrients;
        }
        private void AddSugarRecommendation(float value)
        {
            var sugarDailyValue = new DailyValue()
            {
                Id = 1,
                Name = "Sugar",
                Value = value
            };
            _dailyValues.Add(sugarDailyValue);
        }

        private FoodTag AddLowSugarTag()
        {
            var lowSugarTag = new FoodTag()
            {
                Id = "1",
                Mark = "Positive",
                MaxDailyValuePercentage = 1f,
                Name = "Low Sugar",
                NutrientId = _sugarId,
                NutrientName = "Sugar"
            };
            _foodTags.Add(lowSugarTag);
            return lowSugarTag;
        }

        private FoodTag AddHighSugarTag()
        {
            var highSugarTag = new FoodTag()
            {
                Id = "1",
                Mark = "Negative",
                MinDailyValuePercentage = 100,
                Name = "High Sugar",
                NutrientId = _sugarId,
                NutrientName = "Sugar"
            };
            _foodTags.Add(highSugarTag);
            return highSugarTag;
        }
    }
}
