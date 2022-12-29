using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;

namespace Api.Controllers
{
    public class UserController : ApiControllerBase
    {
        private readonly IUser _service;
        public UserController(IUser user)
        {
            _service = user;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                return Ok(_service.Login(request));
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            try
            {
                _service.Register(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
