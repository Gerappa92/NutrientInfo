using Application.Common.Interfaces;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Mappings;
using Infrastructure.Repositories;
using Infrastructure.Repositories.Interfaces;
using Moq;
using NUnit.Framework;
using System.Linq;

namespace Infrastructure.UnitTests.Repositories
{
    [TestFixture]
    public class FoodTagsRepositoryTests
    {
        private IMapper _mapper;
        private IFoodTagsRepository _foodTagsRepository;

        [SetUp]
        public void SetUp()
        {
            var mockAzureTableRepository = new Mock<IAzureTableRepository<FoodTag>>();
            mockAzureTableRepository.Setup(repo => repo.GetAll()).Returns(_foodTags);
            var repository = mockAzureTableRepository.Object;

            var mapperProfile = new AzureTablesMapping();
            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile(mapperProfile));
            _mapper = new Mapper(mapperConfig);

            _foodTagsRepository = new FoodTagsRepository(repository, _mapper);
        }

        [Test]
        public void Filter_Should_ReturnLowSugarTag()
        {
            var nutrients = new Domain.Entities.NutrientItem[] { GetNutrientItem(1, 100) };

            var tags = _foodTagsRepository.Filter(nutrients);

            tags.Should().HaveCount(1);
            var assertionTag = _mapper.Map<Domain.Entities.FoodTag>(_foodTags[0]);
            tags.First().Should().BeEquivalentTo(assertionTag);
        }

        [Test]
        public void Filter_Should_ReturnHighSugarTag()
        {
            var nutrients = new Domain.Entities.NutrientItem[] { GetNutrientItem(101, 100) };

            var tags = _foodTagsRepository.Filter(nutrients);

            tags.Should().HaveCount(1);
            var assertionTag = _mapper.Map<Domain.Entities.FoodTag>(_foodTags[1]);
            tags.First().Should().BeEquivalentTo(assertionTag);
        }

        [Test]
        public void Filter_Should_NotReturnTag()
        {
            var nutrients = new Domain.Entities.NutrientItem[] { GetNutrientItem(10, 100) };

            var tags = _foodTagsRepository.Filter(nutrients);

            tags.Should().HaveCount(0);
        }

        private FoodTag[] _foodTags = new FoodTag[]
            { 
                new FoodTag()
                {
                    Id = "1",
                    Mark = "Positive",
                    MaxDailyValuePercentage = 1f,
                    Name = "Low Sugar",
                    NutrientId = "269",
                    NutrientName = "Sugar"
                },
                new FoodTag()
                {
                    Id = "1",
                    Mark = "Negative",
                    MinDailyValuePercentage = 100,
                    Name = "High Sugar",
                    NutrientId = "269",
                    NutrientName = "Sugar"
                }
            };

        private Domain.Entities.NutrientItem GetNutrientItem(float value, float recommendedValue)
        {
            Domain.Entities.NutrientItem nutrientItem = new Domain.Entities.NutrientItem()
            {
                Id = "269",
                Name = "Sugar",
                Value = value,
                UnitName = "g",
            };
            nutrientItem.CalcDailyValuePercentage(recommendedValue);
            return nutrientItem;
        }
    }
}
