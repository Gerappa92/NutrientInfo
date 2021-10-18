namespace Infrastructure.Contracts.FoodDataCentral
{
    public class AbridgedFood
    {
        public string dataType { get; set; }
        public string description { get; set; }
        public int fdcId { get; set; }
        public FoodNutrient[] foodNutrients { get; set; }
        public string publicationDate { get; set; }
        public string brandOwner { get; set; }
        public string gtinUpc { get; set; }
        public string ndbNumber { get; set; }
        public string foodCode { get; set; }
    }

    public class FoodNutrient
    {
        public int number { get; set; }
        public string name { get; set; }
        public float amount { get; set; }
        public string unitName { get; set; }
        public string derivationCode { get; set; }
        public string derivationDescription { get; set; }
    }
}
