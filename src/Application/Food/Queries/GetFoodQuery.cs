using Application.Common.Interfaces;
using Application.Food.Dto;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Food.Queries
{
    public class GetFoodQuery : IRequest<FoodDto>
    {
        public string Id { get; set; }
    }

    public class GetFoodQueryHandler : IRequestHandler<GetFoodQuery, FoodDto>
    {
        private readonly IFoodDataService _foodDataService;
        private readonly IDailyValuesRepository _dailyValuesRepository;
        private readonly IFoodTagsRepository _foodTagsRepository;
        private readonly IMapper _mapper;

        public GetFoodQueryHandler(IFoodDataService foodDataService, IDailyValuesRepository dailyValuesRepository, IFoodTagsRepository foodTagsRepository, IMapper mapper)
        {
            _foodDataService = foodDataService;
            _dailyValuesRepository = dailyValuesRepository;
            _foodTagsRepository = foodTagsRepository;
            _mapper = mapper;
        }

        public async Task<FoodDto> Handle(GetFoodQuery request, CancellationToken cancellationToken)
        {
            var food = await _foodDataService.GetFood(request.Id);
            SetNutrientsDailyValues(food);
            SetTags(food);
            FoodDto dto = MapToFoodDto(food);

            return dto;
        }

        private void SetTags(Domain.Entities.Food food)
        {
            var tags = _foodTagsRepository.GetAll();
            food.SetFoodTags(tags);
        }

        private void SetNutrientsDailyValues(Domain.Entities.Food food)
        {
            var dailyValues = _dailyValuesRepository.GetDailyValues();
            food.SetNutrientsDailyValues(dailyValues);
        }

        private FoodDto MapToFoodDto(Domain.Entities.Food food)
        {
            return _mapper.Map<FoodDto>(food);
        }
    }
}
