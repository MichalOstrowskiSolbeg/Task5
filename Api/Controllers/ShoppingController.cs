using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        [Authorize]
        [HttpPost("Purchase")]
        public async Task<IActionResult> Purchase()
        {
            return Ok("Thank you for your purchase");
        }
    }
}
