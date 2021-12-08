using System.Collections.Generic;

namespace Application.Common.Interfaces
{
    public interface IFoodTagsRepository
    {
        public IEnumerable<Domain.Entities.FoodTag> GetAll();
    }
}
