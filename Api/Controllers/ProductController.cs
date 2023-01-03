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

        [HttpPost]
        public async Task<IActionResult> GetAllProducts(ProductRequest request)
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
