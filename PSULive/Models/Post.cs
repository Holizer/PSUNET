namespace PSULive.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime OnSpecialDate { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }

        // public string Author { get; set; }

    }





}
