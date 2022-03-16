using AutoMapper;
using static Application.Meal.Commands.CreateMealCommand;

namespace Application.Common.Mappings
{
    public class MealMapping : Profile
    {
        public MealMapping()
        {
            CreateMap<NutrientDto, Domain.Entities.NutrientItem>();
        }
    }
}
