using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IFoodDataService
    {
        public Task<Domain.Entities.Food[]> SearchFood(string searchTerm, int pageSize = 10, int pageNumber = 1);
        public Task<Domain.Entities.Food> GetFood(string id);
    }
}
