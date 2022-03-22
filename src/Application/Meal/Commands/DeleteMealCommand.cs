using Application.Common.Repositories;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Meal.Commands
{
    public class DeleteMealCommand : IRequest
    {
        public string Id { get; set; }
    }

    public class DeleteMealCommandHandler : IRequestHandler<DeleteMealCommand>
    {
        private readonly IMealRepository _mealRepository;

        public DeleteMealCommandHandler(IMealRepository mealRepository)
        {
            _mealRepository = mealRepository;
        }

        public async Task<Unit> Handle(DeleteMealCommand request, CancellationToken cancellationToken)
        {
            await _mealRepository.DeleteAsync(request.Id);
            return Unit.Value;
        }
    }

    public class DeleteMealCommandValidator : AbstractValidator<DeleteMealCommand>
    {
        public DeleteMealCommandValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty()
                .Must(p => Guid.TryParse(p, out _));
        }
    }
}
