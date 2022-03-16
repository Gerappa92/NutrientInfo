using Application.Common.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.DailyValues.Queries
{
    public class GetDailyValuesQuery : IRequest<Domain.Entities.DailyValue[]>
    {

    }

    public class GetDailyValuesQueryHandler : IRequestHandler<GetDailyValuesQuery, IEnumerable<Domain.Entities.DailyValue>>
    {
        private readonly IDailyValuesRepository _dailyValuesRepository;

        public GetDailyValuesQueryHandler(IDailyValuesRepository dailyValuesRepository)
        {
            _dailyValuesRepository = dailyValuesRepository;
        }

        public Task<IEnumerable<Domain.Entities.DailyValue>> Handle(GetDailyValuesQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_dailyValuesRepository.GetDailyValues());
        }
    }
}
