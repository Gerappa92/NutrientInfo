using Application.Food.Queries;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IFoodDataService
    {
        public Task<Domain.Collections.FilteredFoodList> SearchFood(SearchFoodQuery searchFoodQuery);
        public Task<Domain.Entities.Food> GetFood(string id);
    }
}
