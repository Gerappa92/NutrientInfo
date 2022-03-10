using Application.Common.UsersManagement;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using static Application.Common.Consts.RegexPatterns;

namespace Application.User.Commands
{
    public class ResetUserPasswordCommand : IRequest
    {
        public string Email { get; set; }
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
            await _userService.ResetPassword(request.Email, request.Password, request.NewPassword);
            return Unit.Value;
        }
    }

    public class ResetUserPasswordCommandValidator : AbstractValidator<ResetUserPasswordCommand>
    {
        public ResetUserPasswordCommandValidator()
        {
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.Password).NotEmpty().Matches(PASSWORD_PATTERN);
            RuleFor(p => p.NewPassword).NotEmpty().Matches(PASSWORD_PATTERN);
        }
    }
}
