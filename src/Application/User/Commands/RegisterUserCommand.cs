using Application.Common.UsersManagement;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands
{
    public class RegisterUserCommand : IRequest
    {
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
            await _userManager.Register(request.Email, request.Password);
            return Unit.Value;
        }
    }
}
