using Application.Common.Interfaces;
using Application.Food.Queries;
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

       [Test]
       public async Task ShouldReturnFoods()
        {
            var foodDataServiceMock = new Mock<IFoodDataService>();
            var query = new SearchFoodQuery();
            foodDataServiceMock.Setup(s => s.SearchFood(query))
                .ReturnsAsync(new Application.Food.Dto.SearchFoodDto()
                {
                    Foods = new Domain.Entities.Food[] {new Domain.Entities.Food() }
                });

            _searchFoodQueryHandler = new SearchFoodQueryHandler(foodDataServiceMock.Object);

            var result = await _searchFoodQueryHandler.Handle(query, new System.Threading.CancellationToken());

            Assert.IsTrue(result.Foods.Any());
        }
    }
}
