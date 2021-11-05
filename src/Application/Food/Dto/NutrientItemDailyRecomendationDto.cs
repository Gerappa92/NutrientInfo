using System.Collections.Generic;
using System.Linq;

namespace Application.Food.Dto
{
    public class NutrientItemDailyRecomendationDto : Domain.Entities.NutritionalItem
    {
        private float _recommendedValue;
        public float DailyValuePercentage => _recommendedValue > 0 ? Value / _recommendedValue : 0;
        public string Status { get; private set; } = "Neutral";
        public void SetStatus(NutritionalItemStatus status)
        {
            Status = status.ToString();
        }

        private Dictionary<float, NutritionalItemStatus> Statuses = new Dictionary<float, NutritionalItemStatus>()
        {
            { 0, NutritionalItemStatus.Neutral },
            { 0.5f ,NutritionalItemStatus.Good },
            { 1 ,NutritionalItemStatus.Warning },
            { float.MaxValue,NutritionalItemStatus.Bad }
        };

        public NutrientItemDailyRecomendationDto(Domain.Entities.NutritionalItem item, float recommendedValue)
        {
            Id = item.Id;
            Name = item.Name;
            Value = item.Value;
            UnitName = item.UnitName;
            _recommendedValue = recommendedValue;
            SetStatus();
        }

        private void SetStatus()
        {
            var statuses = Statuses.Where(s => DailyValuePercentage <= s.Key );
            var key = statuses.Min(s => s.Key);
            Status = Statuses[key].ToString();
        }
    }

    public enum NutritionalItemStatus
    {
        Good,
        Neutral,
        Warning,
        Bad
    }
}
