using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interfaces;

namespace Api.Controllers
{
    public class BrandController : ApiControllerBase
    {
        private readonly IBrand _service;
        public BrandController(IBrand brand)
        {
            _service = brand;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsBrands()
        {
            return Ok(await _service.GetProductsBrands());
        }
    }
}
