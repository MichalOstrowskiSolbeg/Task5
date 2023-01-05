using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;

namespace Api.Controllers
{
    public class ProductController : ApiControllerBase
    {
        private readonly IProduct _service;
        public ProductController(IProduct product)
        {
            _service = product;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery]ProductRequest request)
        {
            return Ok(await _service.GetProducts(request));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProductDetails(int id)
        {
            return Ok(await _service.GetProduct(id));
        }
    }
}
