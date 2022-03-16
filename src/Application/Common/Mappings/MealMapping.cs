using Application.Meal.Dto;
using AutoMapper;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.Common.Mappings
{
    public class MealMapping : Profile
    {
        public MealMapping()
        {
            CreateMap<NutrientDto, NutrientItem>();
        }
    }

    public static class MealMappingHelper
    {
        public static IEnumerable<Ingredient> MapIngredients(IEnumerable<IngredientDto> ingredientDtos)
        {

            var ingredients = new List<Ingredient>();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<NutrientDto, NutrientItem>()).CreateMapper();

            foreach (var dto in ingredientDtos)
            {

                var nutrients = mapper.Map<List<NutrientItem>>(dto.Nutrients);
                var food = new Domain.Entities.Food
                {
                    Id = dto.Id,
                    Name = dto.Name,
                    BrandOwner = dto.BrandOwner,
                    BrandName = dto.BrandName,
                    Nutrients = nutrients,
                };

                var ingredient = new Ingredient(food, dto.Amount);
                ingredients.Add(ingredient);
            }
            return ingredients;
        }
    }
}
