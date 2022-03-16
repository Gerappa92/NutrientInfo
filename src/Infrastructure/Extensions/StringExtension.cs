namespace Infrastructure.Extensions
{
    public static class StringExtension
    {
        public static bool IsEmpty(this string s) => string.IsNullOrEmpty(s);
    }
}
