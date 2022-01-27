using Application.Food.Dto;
using AutoMapper;

namespace Application.Common.Mappings
{
    public class FoodMapping : Profile
    {
        public FoodMapping()
        {
            CreateMap<Domain.Entities.Food, FoodDto>();
            CreateMap<Domain.Collections.FilteredFoodList, FilteredFoodListDto>();
            CreateMap<Domain.Entities.NutrientItem, NutrientItemDto>();
            CreateMap<Domain.Entities.FoodTag, FoodTagDto>();
        }
    }
}
