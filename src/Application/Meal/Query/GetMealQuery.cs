using Application.Common.Repositories;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Meal.Query
{
    public class GetMealQuery : IRequest<Domain.Entities.Meal>
    {
        public string Id { get; set; }
    }

    public class GetMealQueryHandler : IRequestHandler<GetMealQuery, Domain.Entities.Meal>
    {
        private readonly IMealRepository _mealRepository;

        public GetMealQueryHandler(IMealRepository mealRepository)
        {
            _mealRepository = mealRepository;
        }

        public async Task<Domain.Entities.Meal> Handle(GetMealQuery request, CancellationToken cancellationToken)
        {
            var meal = await _mealRepository.GetAsync(request.Id);
            return meal;
        }
    }

    public class GetMealQueryValidator : AbstractValidator<GetMealQuery>
    {
        public GetMealQueryValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty()
                .Must(p => Guid.TryParse(p, out _))
                .WithMessage("Id has wrong format");
        }
    }
}
