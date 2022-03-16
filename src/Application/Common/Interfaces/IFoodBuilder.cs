using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IFoodBuilder
    {
        public Task<Domain.Entities.Food> GetFood(string id);
        public Domain.Entities.Food SetDetailes(Domain.Entities.Food food);
    }
}
