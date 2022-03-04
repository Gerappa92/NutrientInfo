using Application.Common.Interfaces;
using Application.Common.Repositories;
using System.Threading.Tasks;

namespace Application.Food
{
    public class FoodBuilder : IFoodBuilder
    {
        private readonly IFoodDataService _foodDataService;
        private readonly IDailyValuesRepository _dailyValuesRepository;
        private readonly IFoodTagsRepository _foodTagsRepository;
        public FoodBuilder(IFoodDataService foodDataService,
                           IDailyValuesRepository dailyValuesRepository,
                           IFoodTagsRepository foodTagsRepository)
        {
            _foodDataService = foodDataService;
            _dailyValuesRepository = dailyValuesRepository;
            _foodTagsRepository = foodTagsRepository;
        }

        public async Task<Domain.Entities.Food> GetFood(string id)
        {
            return await _foodDataService.GetFood(id);
        }

        public Domain.Entities.Food SetDetailes(Domain.Entities.Food food)
        {
            var dailyValues = _dailyValuesRepository.GetDailyValues();
            var tags = _foodTagsRepository.GetAll();

            food.SetDetails(dailyValues, tags);
            return food;
        }
    }
}
