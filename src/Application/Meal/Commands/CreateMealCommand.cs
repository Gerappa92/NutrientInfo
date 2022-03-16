using AutoMapper;
using Domain.Entities;
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
        public string UserEmail { get; set; }

        public List<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();

        public class IngredientDto
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public string BrandOwner { get; set; }
            public string BrandName { get; set; }
            public float Amount { get; set; }
            public List<NutrientDto> Nutrients { get; set; } = new List<NutrientDto>();
        }

        public class NutrientDto
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public float Value { get; set; }
            public string UnitName { get; set; }
        }
    }

    public class CreateMealCommandHandler : IRequestHandler<CreateMealCommand>
    {
        private readonly IMapper _mapper;

        public CreateMealCommandHandler(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<Unit> Handle(CreateMealCommand request, CancellationToken cancellationToken)
        {
            var meal = new Domain.Entities.Meal(request.Name, request.UserEmail);
            var ingredients = GetIngredients(request.Ingredients);
            meal.AddIngredients(ingredients);

            return await Task.FromResult(Unit.Value);
        }

        private IEnumerable<Ingredient> GetIngredients(IEnumerable<CreateMealCommand.IngredientDto> ingredientDtos)
        {
            var ingredients = new List<Ingredient>();

            foreach (var dto in ingredientDtos)
            {
                var nutrients = _mapper.Map<List<NutrientItem>>(dto.Nutrients);
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

    public class CreateMealCommandValidator : AbstractValidator<CreateMealCommand>
    {
        public CreateMealCommandValidator()
        {
            RuleFor(p => p.Name).NotEmpty();
            RuleFor(p => p.Ingredients).NotEmpty();
        }
    }
}
