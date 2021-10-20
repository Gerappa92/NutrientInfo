using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Food.Queries
{
    public class GetFoodQuery : IRequest<Domain.Entities.Food>
    {
        public string Id { get; set; }
    }

    public class GetFoodQueryHandler : IRequestHandler<GetFoodQuery, Domain.Entities.Food>
    {
        private readonly IFoodDataService _foodDataService;

        public GetFoodQueryHandler(IFoodDataService foodDataService)
        {
            _foodDataService = foodDataService;
        }

        public async Task<Domain.Entities.Food> Handle(GetFoodQuery request, CancellationToken cancellationToken)
        {
            var dto = await _foodDataService.GetFood(request.Id);
            return dto;
        }
    }
}
