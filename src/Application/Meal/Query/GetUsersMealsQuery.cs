using Application.Common.Repositories;
using FluentValidation;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Meal.Query
{
    public class GetUsersMealsQuery : IRequest<IEnumerable<Domain.Entities.Meal>>
    {
        public string UserEmail { get; set; }
    }

    public class GetUsersMealsQueryHandler : IRequestHandler<GetUsersMealsQuery, IEnumerable<Domain.Entities.Meal>>
    {
        private readonly IMealRepository _mealRepository;

        public GetUsersMealsQueryHandler(IMealRepository mealRepository)
        {
            _mealRepository = mealRepository;
        }

        public async Task<IEnumerable<Domain.Entities.Meal>> Handle(GetUsersMealsQuery request, CancellationToken cancellationToken)
        {
            var meals = await _mealRepository.GetUsersMeals(request.UserEmail);
            return meals;
        }
    }

    public class GetUsersMealsQueryValidator : AbstractValidator<GetUsersMealsQuery>
    {
        public GetUsersMealsQueryValidator()
        {
            RuleFor(p => p.UserEmail)
                .NotEmpty()
                .EmailAddress();
        }
    }
}
