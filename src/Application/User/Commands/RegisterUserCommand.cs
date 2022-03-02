using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands
{
    public class RegisterUserCommand : IRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand>
    {
        private readonly IUserService _userManager;

        public RegisterUserCommandHandler(IUserService userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            Domain.Entities.User user = new Domain.Entities.User(request.Email, request.Name, request.Password);
            await _userManager.Register(user);

            return Unit.Value;
        }
    }
}
