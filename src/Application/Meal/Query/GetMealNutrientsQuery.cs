using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Meal.Dto;
using Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Meal.Query
{
    public class GetMealNutrientsQuery : IRequest<IEnumerable<NutrientItem>>
    {
        public IEnumerable<IngredientDto> Ingredients { get; set; }
    }

    public class GetMealNutrientsQueryHandler : IRequestHandler<GetMealNutrientsQuery, IEnumerable<NutrientItem>>
    {
        private readonly IMealCalculator _mealCalculator;

        public GetMealNutrientsQueryHandler(IMealCalculator mealCalculator)
        {
            _mealCalculator = mealCalculator;
        }

        public async Task<IEnumerable<NutrientItem>> Handle(GetMealNutrientsQuery request, CancellationToken cancellationToken)
        {
            var ingredients = MealMappingHelper.MapIngredients(request.Ingredients);
            return await Task.FromResult(_mealCalculator.CalculateNutrients(ingredients));
        }
    }
}
