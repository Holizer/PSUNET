using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PSULive.Models;


namespace PSULive.Controls
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        ApplicationContext db;


        public HomeController(ILogger<HomeController> logger, ApplicationContext context)
        {
            _logger = logger;
            db = context;
        }
      
        public class PostViewModel
        {
            public IEnumerable<Post> Posts { get; set; }
            public Post NewPost { get; set; }
        }

        public async Task<IActionResult> Index()
        {
            var posts = await db.Posts.ToListAsync();
            var viewModel = new PostViewModel
            {
                Posts =  posts,
                NewPost = new Post()
            };

            return View(viewModel);
        }

      
        [HttpPost]
        public async Task<IActionResult> Create(PostViewModel viewModel)
        {
           
                db.Posts.Add(viewModel.NewPost);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");

       
        }
    }
}
