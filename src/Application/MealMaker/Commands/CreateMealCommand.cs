using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.MealMaker.Commands
{
    public class CreateMealCommand : IRequest
    {
        public string Name { get; set; }
        public string UserId { get; set; }

        public IEnumerable<IngriedientDto> Ingriedients{ get; set; }

        public class IngriedientDto
        {
            public string Id { get; set; }
            public float Amount { get; set; }
        }
    }

    public class CreateMealCommandHandler : IRequestHandler<CreateMealCommand>
    {
        private IUserService _userService;
        private IFoodDataService _foodDataService;


        public async Task<Unit> Handle(CreateMealCommand request, CancellationToken cancellationToken)
        {
            var user = _userService.GetUser(request.UserId);

            var ingriedients = await GetIngriedients(request.Ingriedients);

            var meal = new Meal(request.Name, user, ingriedients);

            return Unit.Value;
        }

        private async Task<IEnumerable<Ingriedient>> GetIngriedients(IEnumerable<CreateMealCommand.IngriedientDto> ingriedientDtos)
        {
            var ingriedients = new List<Ingriedient>();
            foreach (var dto in ingriedientDtos)
            {
                var food = await _foodDataService.GetFood(dto.Id);
                var ingriedient = new Ingriedient(food, dto.Amount);
                ingriedients.Add(ingriedient);
            }
            return ingriedients;
        }
    }
}
