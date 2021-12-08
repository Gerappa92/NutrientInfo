using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class NutrientItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public string UnitName { get; set; }
        public float DailyValuePercentage { get; private set; }
        public string Status { get; private set; } = "Neutral";

        public NutrientItem()
        {
            CalcDailyValuePercentage(0);
        }

        private Dictionary<float, NutrientItemStatus> Statuses = new Dictionary<float, NutrientItemStatus>()
        {
            { 0, NutrientItemStatus.Neutral },
            { 0.5f ,NutrientItemStatus.Good },
            { 1 ,NutrientItemStatus.Warning },
            { float.MaxValue,NutrientItemStatus.Bad }
        };

        public void CalcDailyValuePercentage(float recommendedValue)
        { 
            DailyValuePercentage = recommendedValue > 0 ? Value / recommendedValue : 0;
            SetStatus();
        }
        private void SetStatus()
        {
            var statuses = Statuses.Where(s => DailyValuePercentage <= s.Key);
            var key = statuses.Min(s => s.Key);
            Status = Statuses[key].ToString();
        }
    }

    public enum NutrientItemStatus
    {
        Good,
        Neutral,
        Warning,
        Bad
    }
}
