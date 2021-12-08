using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Food.Queries
{
    public class GetFoodQuery : IRequest<Domain.Entities.Food>
    {
        public string Id { get; set; }
    }

    public class GetFoodQueryHandler : IRequestHandler<GetFoodQuery, Domain.Entities.Food>
    {
        private readonly IFoodDataService _foodDataService;
        private readonly IDailyValuesRepository _dailyValuesRepository;
        private readonly IFoodTagsRepository _foodTagsRepository;

        public GetFoodQueryHandler(IFoodDataService foodDataService, IDailyValuesRepository dailyValuesRepository, IFoodTagsRepository foodTagsRepository)
        {
            _foodDataService = foodDataService;
            _dailyValuesRepository = dailyValuesRepository;
            _foodTagsRepository = foodTagsRepository;
        }

        public async Task<Domain.Entities.Food> Handle(GetFoodQuery request, CancellationToken cancellationToken)
        {
            var food = await _foodDataService.GetFood(request.Id);
            var dailyValues = _dailyValuesRepository.GetDailyValues();

            foreach (var dailyValue in dailyValues)
            {
                var nutrient = food.Nutrients.FirstOrDefault(n => n.Id == dailyValue.Id.ToString());
                if(nutrient != null)
                {
                    nutrient.CalcDailyValuePercentage(dailyValue.Value);
                }
            }

            var tags = _foodTagsRepository.Filter(food.Nutrients);
            food.AddFoodTags(tags);

            return food;
        }
    }
}
