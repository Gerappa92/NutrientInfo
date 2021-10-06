using Infrastructure.Exceptions;
using Newtonsoft.Json;
using System;

namespace WebAPI.Contracts
{
    public class ErrorResponse
    {
        public string Code { get; private set; }
        public string Message { get; private set; }

        public ErrorResponse(InfrastructureException exception)
        {
            Code = exception.Code();
            Message = "Infrastructure Exception. Please contact support if it is necessary.";
        }

        public ErrorResponse(Exception exception)
        {
            Code = exception.GetType().Name;
            Message = "Unknown Exception. Please contact support if it is necessary.";
        }

        public string ToJson() => JsonConvert.SerializeObject(this);

        public void SetMessage(string message) => Message = message;
    }
}
