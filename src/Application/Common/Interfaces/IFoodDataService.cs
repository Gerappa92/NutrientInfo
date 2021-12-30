using Application.Food.Dto;
using Application.Food.Queries;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IFoodDataService
    {
        public Task<SearchFoodDto> SearchFood(SearchFoodQuery searchFoodQuery);
        public Task<Domain.Entities.Food> GetFood(string id);
    }
}
