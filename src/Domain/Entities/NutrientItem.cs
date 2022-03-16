using System.Collections.Generic;
using System.Linq;

namespace Domain.Entities
{
    public class NutrientItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public string UnitName { get; set; } = string.Empty;
        public float DailyValuePercentage { get; private set; }
        public string Status { get; private set; } = "Neutral";

        public NutrientItem()
        {
            UnitName = UnitName.ToLower();
            CalcDailyValuePercentage(0);
        }

        public NutrientItem(NutrientItem nutrient, float value)
        {
            Id = nutrient.Id;
            Name = nutrient.Name;
            Value = value;
            UnitName = nutrient.UnitName;
            DailyValuePercentage = nutrient.DailyValuePercentage;
            Status = nutrient.Status;
        }

        private Dictionary<float, NutrientItemStatus> Statuses = new Dictionary<float, NutrientItemStatus>()
        {
            { 0, NutrientItemStatus.Neutral },
            { 50f ,NutrientItemStatus.Good },
            { 100 ,NutrientItemStatus.Warning },
            { float.MaxValue,NutrientItemStatus.Bad }
        };

        public void CalcDailyValuePercentage(float recommendedValue)
        {
            DailyValuePercentage = recommendedValue <= 0 ? 0 : CalcPercentage(Value, recommendedValue);
            SetStatus();
        }

        private float CalcPercentage(float devidend, float divisor) => (devidend / divisor) * 100;

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
