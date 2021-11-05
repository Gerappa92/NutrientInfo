using NUnit.Framework;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Food.Dto;
using FluentAssertions;

namespace Application.UnitTests.Food.Dto
{
    [TestFixture]
    public class NutrientItemDailyRecomendationDtoTests
    {
        Domain.Entities.NutritionalItem _nutritionalItem;

        [SetUp]
        public void SetUp()
        {
            _nutritionalItem = new Domain.Entities.NutritionalItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = 10
            };
        }

        [Test]
        public void Should_Calculate_DailyRecomendationPercentage()
        {
            float recomendedValue = 100;
            var nutrientItemRecomend = new NutrientItemDailyRecomendationDto(_nutritionalItem, recomendedValue);

            nutrientItemRecomend.DailyValuePercentage.Should().Be(0.1f);
        }

        [Test]
        public void Should_SetZeroFor_DailyRecomendationPercentage()
        {
            var nutritionalItem = new Domain.Entities.NutritionalItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = 0
            };
            float recomendedValue = 100;
            var nutrientItemRecomend = new NutrientItemDailyRecomendationDto(nutritionalItem, recomendedValue);

            nutrientItemRecomend.DailyValuePercentage.Should().Be(0);
        }

        [TestCase(0, NutritionalItemStatus.Neutral)]
        [TestCase(0.5f, NutritionalItemStatus.Good)]
        [TestCase(1, NutritionalItemStatus.Warning)]
        [TestCase(1+1, NutritionalItemStatus.Bad)]
        public void Shoul_SetAppropriateStatus(float value, NutritionalItemStatus status)
        {
            var nutritionalItem = new Domain.Entities.NutritionalItem()
            {
                Id = "1",
                Name = "Protein",
                UnitName = "g",
                Value = value * 100
            };
            float recomendedValue = 100;
            var nutrientItemRecomend = new NutrientItemDailyRecomendationDto(nutritionalItem, recomendedValue);

            nutrientItemRecomend.Status.Should().Be(status.ToString());
        }
    }
}
