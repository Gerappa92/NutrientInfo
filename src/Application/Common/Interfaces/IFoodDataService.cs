using Application.Food.Dto;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IFoodDataService
    {
        public Task<SearchFoodDto> SearchFood(string searchTerm, int pageSize = 10, int pageNumber = 1, string brandOwner = "");
        public Task<Domain.Entities.Food> GetFood(string id);
    }
}
