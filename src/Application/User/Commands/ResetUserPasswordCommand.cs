using Application.Common.UsersManagement;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User.Commands
{
    public class ResetUserPasswordCommand : IRequest
    {
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }

    public class ResetUserPasswordCommandHandler : IRequestHandler<ResetUserPasswordCommand>
    {
        private readonly IUserService _userService;

        public ResetUserPasswordCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Unit> Handle(ResetUserPasswordCommand request, CancellationToken cancellationToken)
        {
            await _userService.ResetPassword(request.UserEmail, request.Password, request.NewPassword);
            return Unit.Value;
        }
    }
}
