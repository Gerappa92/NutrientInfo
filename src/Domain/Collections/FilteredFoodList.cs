using Domain.Entities;

namespace Domain.Collections
{
    public class FilteredFoodList
    {
        public Food[] Foods { get; set; }
        public string Query { get; set; }
        public string TotalHits { get; set; }
    }
}
