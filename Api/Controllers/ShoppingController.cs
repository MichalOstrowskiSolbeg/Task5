using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using System.Data;

namespace Api.Controllers
{
    public class ShoppingController : ApiControllerBase
    {
        public ShoppingController() 
        {

        }

        [Authorize]
        [HttpPost("Purchase")]
        public async Task<IActionResult> Purchase(List<object> a)
        {
            var b = a.First();

            //var c = b.Product;*/
            return Ok("Thank you for your purchase");
        }
    }
}
