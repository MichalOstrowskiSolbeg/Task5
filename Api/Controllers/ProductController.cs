using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interfaces;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _service;
        public ProductController(IProduct product)
        {
            _service = product;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(await _service.GetProducts());
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProductDetails(int id)
        {
            return Ok(await _service.GetProduct(id));
        }
    }
}
