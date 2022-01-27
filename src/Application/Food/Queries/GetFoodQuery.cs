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
        private IFoodBuilder _foodBuilder;
        private readonly IMapper _mapper;

        public GetFoodQueryHandler(IFoodBuilder foodBuilder, IMapper mapper)
        {
            _foodBuilder = foodBuilder;
            _mapper = mapper;
        }

        public async Task<FoodDto> Handle(GetFoodQuery request, CancellationToken cancellationToken)
        {
            var food = await _foodBuilder.GetFood(request.Id);
            _foodBuilder.SetDetailes(food);
            
            FoodDto dto = MapToFoodDto(food);

            return dto;
        }

        private FoodDto MapToFoodDto(Domain.Entities.Food food)
        {
            return _mapper.Map<FoodDto>(food);
        }
    }
}
