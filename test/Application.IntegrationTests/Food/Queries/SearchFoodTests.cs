using Application.Common.Interfaces;
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

            _searchFoodQueryHandler = new SearchFoodQueryHandler(foodDataServiceMock.Object, new Mock<IMapper>().Object);

            var result = await _searchFoodQueryHandler.Handle(query, new System.Threading.CancellationToken());

            Assert.IsTrue(result.Foods.Any());
        }
    }
}
