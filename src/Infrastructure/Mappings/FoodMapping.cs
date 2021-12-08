using Application.Food.Dto;
using AutoMapper;
using Infrastructure.Contracts.FoodDataCentral;

namespace Infrastructure.Mappings
{
    public class FoodMapping : Profile
    {
        public FoodMapping()
        {
            CreateMap<SearchResult, SearchFoodDto>()
                .ForMember(dto => dto.Foods, c => c.MapFrom(r => r.foods))
                .ForMember(dto => dto.Query, c => c.MapFrom(r => r.foodSearchCriteria.query))
                .ForMember(dto => dto.TotalHits, c => c.MapFrom(r => r.totalHits));
            CreateMap<Food, Domain.Entities.Food>()
                .ForMember(dto => dto.Id, c => c.MapFrom(r => r.fdcId))
                .ForMember(dto => dto.BrandName, c => c.MapFrom(r => r.brandName))
                .ForMember(dto => dto.BrandOwner, c => c.MapFrom(r => r.brandOwner))
                .ForMember(dto => dto.Name, c => c.MapFrom(r => r.description))
                .ForMember(dto => dto.Nutrients, c => c.MapFrom(r => r.foodNutrients))
                .ForMember(dto => dto.DataSourceName, c => c.MapFrom(r => r.dataType));
            CreateMap<FoodNutrient, Domain.Entities.NutrientItem>()
                .ForMember(dto => dto.Id, c => c.MapFrom(r => r.nutrientNumber))
                .ForMember(dto => dto.Name, c => c.MapFrom(r => r.nutrientName))
                .ForMember(dto => dto.Value, c => c.MapFrom(r => r.value))
                .ForMember(dto => dto.UnitName, c => c.MapFrom(r => r.unitName));
            CreateMap<AbridgedFood, Domain.Entities.Food>()
                .ForMember(dto => dto.Id, c => c.MapFrom(r => r.fdcId))
                .ForMember(dto => dto.BrandOwner, c => c.MapFrom(r => r.brandOwner))
                .ForMember(dto => dto.BrandName, c => c.MapFrom(r => r.brandName))
                .ForMember(dto => dto.Name, c => c.MapFrom(r => r.description))
                .ForMember(dto => dto.Nutrients, c => c.MapFrom(r => r.foodNutrients))
                .ForMember(dto => dto.DataSourceName, c => c.MapFrom(r => r.dataType));
            CreateMap<AbridgedFoodNutrient, Domain.Entities.NutrientItem>()
                .ForMember(dto => dto.Id, c => c.MapFrom(r => r.number))
                .ForMember(dto => dto.Name, c => c.MapFrom(r => r.name))
                .ForMember(dto => dto.Value, c => c.MapFrom(r => r.amount))
                .ForMember(dto => dto.UnitName, c => c.MapFrom(r => r.unitName));
        }
    }
}
