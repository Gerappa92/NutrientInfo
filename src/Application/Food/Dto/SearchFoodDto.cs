using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Food.Dto
{
    public class SearchFoodDto
    {
        public Domain.Entities.Food[] Foods { get; set; }
        public string Query { get; set; }
        public string TotalHits { get; set; }
    }
}
