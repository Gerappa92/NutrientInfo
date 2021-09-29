using Application.Food;
using AutoMapper;

namespace Infrastructure.Mappings
{
    public class SearchResultProfile : Profile
    {
        public SearchResultProfile()
        {
            CreateMap<SearchResult, SearchFoodDto>()
                .ForMember(dto => dto.Query, c => c.MapFrom(r => r.foodSearchCriteria.query))
                .ForMember(dto => dto.PageSize, c => c.MapFrom(r => r.foodSearchCriteria.pageSize))
                .ForMember(dto => dto.PageNumber, c => c.MapFrom(r => r.foodSearchCriteria.pageNumber))
                .ForMember(dto => dto.TotalHits, c => c.MapFrom(r => r.totalHits))
                .ForMember(dto => dto.Foods, c => c.MapFrom(r => r.foods));
            CreateMap<Food, FoodDto>()
                .ForMember(dto => dto.BrandName, c => c.MapFrom(r => r.brandName))
                .ForMember(dto => dto.Description, c => c.MapFrom(r => r.description))
                .ForMember(dto => dto.Nutrients, c => c.MapFrom(r => r.foodNutrients));
            CreateMap<FoodNutrient, FoodNutrientDto>()
                .ForMember(dto => dto.Number, c => c.MapFrom(r => r.nutrientNumber))
                .ForMember(dto => dto.Name, c => c.MapFrom(r => r.nutrientName))
                .ForMember(dto => dto.Value, c => c.MapFrom(r => r.value))
                .ForMember(dto => dto.UnitName, c => c.MapFrom(r => r.unitName));
        }
    }
}
