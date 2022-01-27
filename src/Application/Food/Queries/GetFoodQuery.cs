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
            var dailyValues = _dailyValuesRepository.GetDailyValues();
            var tags = _foodTagsRepository.GetAll();

            food.SetDetails(dailyValues, tags);
            
            FoodDto dto = MapToFoodDto(food);

            return dto;
        }

        private FoodDto MapToFoodDto(Domain.Entities.Food food)
        {
            return _mapper.Map<FoodDto>(food);
        }
    }
}
