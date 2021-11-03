using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.DailyValues.Queries
{
    public class GetDailyValuesQuery : IRequest<Domain.Entities.DailyValues[]>
    {

    }

    public class GetDailyValuesQueryHandler : IRequestHandler<GetDailyValuesQuery, Domain.Entities.DailyValues[]>
    {
        private readonly IDailyValuesRepository _dailyValuesRepository;

        public GetDailyValuesQueryHandler(IDailyValuesRepository dailyValuesRepository)
        {
            _dailyValuesRepository = dailyValuesRepository;
        }

        public Task<Domain.Entities.DailyValues[]> Handle(GetDailyValuesQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_dailyValuesRepository.GetDailyValues());
        }
    }
}
