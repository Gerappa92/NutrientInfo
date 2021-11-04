using Application.Common.Interfaces;
using Application.Food.Dto;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Food.Queries
{
    public class GetFoodQuery : IRequest<FoodDetailsDto>
    {
        public string Id { get; set; }
    }

    public class GetFoodQueryHandler : IRequestHandler<GetFoodQuery, FoodDetailsDto>
    {
        private readonly IFoodDataService _foodDataService;
        private readonly IDailyValuesRepository _dailyValuesRepository;

        public GetFoodQueryHandler(IFoodDataService foodDataService, IDailyValuesRepository dailyValuesRepository)
        {
            _foodDataService = foodDataService;
            _dailyValuesRepository = dailyValuesRepository;
        }

        public async Task<FoodDetailsDto> Handle(GetFoodQuery request, CancellationToken cancellationToken)
        {
            var food = await _foodDataService.GetFood(request.Id);
            var dailyValues = _dailyValuesRepository.GetDailyValues();

            var nutrients = food.Nutrients.Select(n => new NutrientItemDailyRecomendationDto(n, GetRecommendedDailyValue(dailyValues, n.Id))).ToArray();

            var dto = new FoodDetailsDto(food, nutrients);
            return dto;
        }

        private float GetRecommendedDailyValue(Domain.Entities.DailyValue[] dailyValues, string id)
        {
            var dailyValue = dailyValues.FirstOrDefault(dv => dv.Id.ToString() == id);
            if(dailyValue is not null)
            {
                return dailyValue.Value;
            }
            return 0;
        }
    }
}
