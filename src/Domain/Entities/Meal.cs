using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class Meal
    {
        public Meal(string name, User author, IEnumerable<Ingriedient> ingriedients)
        { 
            Name = name;
            Author = author;
            AddIngriedients(ingriedients);
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public User Author { get; set; }
        public HashSet<Ingriedient> Ingriedients { get; set; } = new HashSet<Ingriedient>();
        

        public void AddIngriedients(IEnumerable<Ingriedient> ingriedients)
        {
            foreach (var ingriedient in ingriedients)
            {
                Ingriedients.Add(ingriedient);
            }
        }

        public IEnumerable<NutrientItem> GroupNutrients()
        {
            var groupedNutrients = Ingriedients
                .SelectMany(i => i.Nutrients)
                .GroupBy(n => n.Id)
                .Select(n => new NutrientItem(n.First(), n.Sum(s => s.Value)));

            return groupedNutrients;
        }
    }
}
