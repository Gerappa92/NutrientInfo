namespace Domain.Entities
{
    public class NutritionalItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string UnitName { get; set; }
        public string Status { get; private set; } = "Neutral";
        public void SetStatus(NutritionalItemStatus status)
        {
            Status = status.ToString();
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
