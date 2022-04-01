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
    public class CreateMealCommand : IRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserEmail { get; set; }

        public List<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
    }

    public class CreateMealCommandHandler : IRequestHandler<CreateMealCommand>
    {
        private readonly IMealRepository _mealRepository;

        public CreateMealCommandHandler(IMealRepository mealRepository)
        {
            _mealRepository = mealRepository;
        }

        public async Task<Unit> Handle(CreateMealCommand request, CancellationToken cancellationToken)
        {
            var meal = new Domain.Entities.Meal(request.Name, request.UserEmail);
            meal.SetDescription(request.Description);
            var ingredients = MealMappingHelper.MapIngredients(request.Ingredients);
            meal.AddUniqueIngredients(ingredients);

            await _mealRepository.AddAsync(meal);

            return await Task.FromResult(Unit.Value);
        }
    }

    public class CreateMealCommandValidator : AbstractValidator<CreateMealCommand>
    {
        public CreateMealCommandValidator()
        {
            RuleFor(p => p.Name).NotEmpty();
            RuleFor(p => p.Ingredients).NotEmpty();
        }
    }
}
