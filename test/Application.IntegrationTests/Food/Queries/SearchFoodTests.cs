using Application.Common.Interfaces;
using Application.Food.Dto;
using Application.Food.Queries;
using AutoMapper;
using Moq;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace Application.IntegrationTests.Food.Queries
{
    [TestFixture]
    public class SearchFoodTests
    {
        private SearchFoodQueryHandler _searchFoodQueryHandler;
        private IMapper _mapper;

        [SetUp]
        public void Setup()
        {
            _mapper = new MapperConfiguration(c =>
                {
                    c.CreateMap<Domain.Collections.FilteredFoodList, FilteredFoodListDto>();
                    c.CreateMap<Domain.Entities.Food, FoodDto>();
                }).CreateMapper();
        }

       [Test]
       public async Task ShouldReturnFoods()
        {
            var foodDataServiceMock = new Mock<IFoodDataService>();
            var query = new SearchFoodQuery();
            foodDataServiceMock.Setup(s => s.SearchFood(query))
                .ReturnsAsync(new Domain.Collections.FilteredFoodList()
                {
                    Foods = new Domain.Entities.Food[] {new Domain.Entities.Food() }
                });

            _searchFoodQueryHandler = new SearchFoodQueryHandler(foodDataServiceMock.Object, _mapper);

            var result = await _searchFoodQueryHandler.Handle(query, new System.Threading.CancellationToken());

            Assert.IsTrue(result.Foods.Any());
        }
    }
}
