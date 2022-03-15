﻿using Application.Common.UsersManagement;
using Application.Common.UsersManagement.Contracts;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using static Application.Common.Consts.RegexPatterns;


namespace Application.User.Queries
{
    public class LoginUserQuery : IRequest<LoginResponse>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserQuery, LoginResponse>
    {
        private IUserService _userService;

        public LoginUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<LoginResponse> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var token = await _userService.Login(request.Email, request.Password);
            return token;
        }
    }

    public class LoginUserQueryValidator : AbstractValidator<LoginUserQuery>
    {
        public LoginUserQueryValidator()
        {
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.Password).NotEmpty().Matches(PASSWORD_PATTERN);
        }
    }
}