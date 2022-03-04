using System.Collections.Generic;

namespace Application.Common.Repositories
{
    public interface IFoodTagsRepository
    {
        public IEnumerable<Domain.Entities.FoodTag> GetAll();
    }
}
