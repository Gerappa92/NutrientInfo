using System;

namespace Infrastructure.Exceptions
{
    /// <summary>
    /// Infrastructure layer exception abstract class
    /// </summary>
    public abstract class InfrastructureException : Exception
    {
        /// <summary>
        /// Unique exception code
        /// </summary>
        /// <returns></returns>
        public string Code() => "Infrastructure_" + GetType().Name;

        public InfrastructureException(string message) : base(message)
        {

        }
    }
}
