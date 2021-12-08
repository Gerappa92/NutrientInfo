using System.Collections.Generic;

namespace Domain.Entities
{
    public class Food
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BrandOwner { get; set; }
        public string BrandName { get; set; }
        public List<NutrientItem> Nutrients { get; set; } = new List<NutrientItem>();
        public string DataSourceName { get; set; }
    }
}
