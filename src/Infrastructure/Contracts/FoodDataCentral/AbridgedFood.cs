namespace Infrastructure.Contracts.FoodDataCentral
{
    public class AbridgedFood
    {
        public int fdcId { get; set; }
        public string description { get; set; }
        public string dataType { get; set; }
        public string publicationDate { get; set; }
        public string brandOwner { get; set; }
        public string ndbNumber { get; set; }
        public AbridgedFoodNutrient[] foodNutrients { get; set; }
    }

    public class AbridgedFoodNutrient
    {
        public string number { get; set; }
        public string name { get; set; }
        public float amount { get; set; }
        public string unitName { get; set; }
        public string derivationCode { get; set; }
        public string derivationDescription { get; set; }
    }
}
