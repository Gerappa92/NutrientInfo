using Application.Common.UsersManagement;
using Application.Common.UsersManagement.Contracts;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace Application.User.Commands
{
    public class RefreshCredentialsCommand : IRequest<RefreshResponse>
    {
        public string UserEmail { get; set; }
        public string RefreshToken { get; set; }
    }

    public class RefreshCredentialsCommandHandler : IRequestHandler<RefreshCredentialsCommand, RefreshResponse>
    {
        private readonly IUserService _userService;

        public RefreshCredentialsCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<RefreshResponse> Handle(RefreshCredentialsCommand request, CancellationToken cancellationToken)
        {
            var tokens = await _userService.RefreshCredentials(request.UserEmail, request.RefreshToken);
            return tokens;
        }
    }

    public class RefreshCredentialsCommandValidator : AbstractValidator<RefreshCredentialsCommand>
    {
        public RefreshCredentialsCommandValidator()
        {
            RuleFor(p => p.UserEmail).NotEmpty().EmailAddress();
            RuleFor(p => p.RefreshToken).NotEmpty();
        }
    }
}
