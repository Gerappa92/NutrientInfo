using System.Collections.Generic;

namespace Application.Common.Interfaces
{
    public interface IFoodTagsRepository
    {
        public IEnumerable<Domain.Entities.FoodTag> GetAll();
        public IEnumerable<Domain.Entities.FoodTag> Filter(IEnumerable<Domain.Entities.NutrientItem> nutrients);
    }
}
