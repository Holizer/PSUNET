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
                Posts = posts,
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

        [HttpPost]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id != null)
            {
                Post? user = await db.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (user != null)
                {
                    db.Posts.Remove(user);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            return NotFound();
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id != null)
            {
                PostViewModel viewModel = new PostViewModel();
                viewModel.Posts = await db.Posts.ToListAsync();
                viewModel.NewPost = await db.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (viewModel.NewPost != null)
                {
                    return View(viewModel);
                }
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Edit(PostViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                db.Posts.Update(viewModel.NewPost);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            // Если модель недействительная, вернуть представление с моделью для исправления ошибок.
            return View(viewModel);
        }
    }
}
