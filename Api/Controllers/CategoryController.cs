using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;

namespace Api.Controllers
{
    public class CategoryController : ApiControllerBase
    {
        private readonly ICategory _service;
        public CategoryController(ICategory category) 
        {
            _service = category;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsCategories()
        {
            return Ok(await _service.GetProductsCategories());
        }
    }
}
