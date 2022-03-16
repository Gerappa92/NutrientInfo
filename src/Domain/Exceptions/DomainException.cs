using System;

namespace Domain.Exceptions
{
    public abstract class DomainException : Exception
    {
        public string Layer = "Domain";

        public DomainException(string message) : base(message)
        {
        }
    }
}
