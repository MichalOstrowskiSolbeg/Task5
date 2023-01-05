using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;
using System.Data;

namespace Api.Controllers
{
    public class ShoppingController : ApiControllerBase
    {
        private readonly IOrder _service;
        public ShoppingController(IOrder order) 
        {
            _service = order;
        }

        [Authorize(Roles = "client")]
        [HttpPost("Purchase")]
        public async Task<IActionResult> Purchase(List<ShoppingRequest> request)
        {
            try
            {
                await _service.CreateOrder(request, GetUserId());
                return Ok("Thank you for your purchase");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
