using Application.Common.Mappings;
using Application.Common.Repositories;
using Application.Meal.Dto;
using FluentValidation;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Meal.Commands
{
    public class UpdateMealCommand : IRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public List<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
    }

    public class UpdateMealCommandHandler : IRequestHandler<UpdateMealCommand>
    {
        private readonly IMealRepository _mealRepository;

        public UpdateMealCommandHandler(IMealRepository mealRepository)
        {
            _mealRepository = mealRepository;
        }

        public async Task<Unit> Handle(UpdateMealCommand request, CancellationToken cancellationToken)
        {
            var meal = await _mealRepository.GetAsync(request.Id);
            meal.Name = request.Name;
            meal.CleanIngredients();
            var ingredients = MealMappingHelper.MapIngredients(request.Ingredients);
            meal.AddUniqueIngredients(ingredients);
            await _mealRepository.UpdateAsync(meal);
            return Unit.Value;
        }
    }

    public class UpdateMealCommandValidator : AbstractValidator<UpdateMealCommand>
    {
        public UpdateMealCommandValidator()
        {
            RuleFor(p => p.Name).NotEmpty();
            RuleFor(p => p.Ingredients).NotEmpty();
        }
    }
}
