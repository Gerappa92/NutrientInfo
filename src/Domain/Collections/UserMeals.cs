using Domain.Entities;
using System.Collections.Generic;

namespace Domain.Collections
{
    public class UserMeals
    {
        public string UserId { get; set; }
        public IEnumerable<Meal> Meals{ get; set; }
    }
}
