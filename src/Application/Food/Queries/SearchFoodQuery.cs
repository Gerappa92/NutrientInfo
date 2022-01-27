using Application.Common.Interfaces;
using Application.Food.Dto;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Food.Queries
{
    public class SearchFoodQuery : IRequest<FilteredFoodListDto>
    {
        public string SearchTerm { get; set; }
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public string BrandOwner { get; set; } = "";
        public bool RequireAllWords { get; set; }
    }

    public class SearchFoodQueryHandler : IRequestHandler<SearchFoodQuery, FilteredFoodListDto>
    {
        private readonly IFoodDataService _foodDataService;
        private readonly IMapper _mapper;

        public SearchFoodQueryHandler(IFoodDataService foodDataService, IMapper mapper)
        {
            _foodDataService = foodDataService;
            _mapper = mapper;
        }

        public async Task<FilteredFoodListDto> Handle(SearchFoodQuery request, CancellationToken cancellationToken)
        {
            var filteredFoodList = await _foodDataService.SearchFood(request);
            var dto = _mapper.Map<FilteredFoodListDto>(filteredFoodList);
            return dto;
        }
    }
}
