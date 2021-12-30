using Application.Common.Interfaces;
using Application.Food.Dto;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Food.Queries
{
    public class SearchFoodQuery : IRequest<SearchFoodDto>
    {
        public string SearchTerm { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public string BrandOwner { get; set; } = "";
        public bool RequireAllWords { get; set; }
    }

    public class SearchFoodQueryHandler : IRequestHandler<SearchFoodQuery, SearchFoodDto>
    {
        private readonly IFoodDataService _foodDataService;

        public SearchFoodQueryHandler(IFoodDataService foodDataService)
        {
            _foodDataService = foodDataService;
        }

        public async Task<SearchFoodDto> Handle(SearchFoodQuery request, CancellationToken cancellationToken)
        {
            var dto = await _foodDataService.SearchFood(request);
            return dto;
        }
    }
}
