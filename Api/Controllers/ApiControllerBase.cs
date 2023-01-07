using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : Controller
    {
        protected int GetUserId()
        {
            var rolesClaims = this.User.Claims.Where(x => x.Type == "Id").ToArray();
            if (rolesClaims.ToList().Any())
            {
                return int.Parse(rolesClaims[0].Value);
            }

            return -1;
        }

        private string GetUserRole()
        {
            var rolesClaims = this.User.Claims.Where(x => x.Type == ClaimTypes.Role).ToArray();
            if (rolesClaims.ToList().Any())
            {
                return rolesClaims[0].Value;
            }

            return "";
        }

        protected bool IsAdmin()
        {
            var role = GetUserRole();
            return role.Equals("admin");
        }

        protected bool IsClient()
        {
            var role = GetUserRole();
            return role.Equals("client");
        }
    }
}