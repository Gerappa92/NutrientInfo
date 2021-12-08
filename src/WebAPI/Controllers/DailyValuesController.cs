using Application.DailyValues.Queries;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class DailyValuesController : ApiBaseController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailyValue>>> Get()
        {
            return await Mediator.Send(new GetDailyValuesQuery());
        }
    }
}
