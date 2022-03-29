using FluentValidation;
using Infrastructure.Exceptions;
using Newtonsoft.Json;
using System;

namespace WebAPI.Contracts
{
    public class ErrorResponse
    {
        public string Type { get; private set; }
        public string Message { get; private set; }

        public ErrorResponse(Exception exception)
        {
            Type = exception.GetType().Name;
            Message = "Unknown Exception. Please contact support if it is necessary.";
        }

        public ErrorResponse(ValidationException exception)
        {
            Type = "Validation failed";
            Message = exception.Message;
        }

        public ErrorResponse(InfrastructureException exception)
        {
            Type = exception.Code();
            Message = "Infrastructure Exception. Please contact support if it is necessary.";
        }

        public string ToJson() => JsonConvert.SerializeObject(this);

        public void SetMessage(string message) => Message = message;
    }
}
