using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class UserService : IUser
    {
        private readonly IUserRepository _reposistory;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository user, IConfiguration configuration) 
        {
            _reposistory= user;
            _configuration = configuration;
        }

        public string Login(LoginRequest request)
        {
            var user = _reposistory.GetUser(request.Username);

            if(user == null)
            {
                throw new Exception("Incorrect");
            }

            byte[] salt = Convert.FromBase64String(user.Salt);
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: request.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: int.Parse(_configuration["iterations"]),
                numBytesRequested: 512 / 8));

            if (!hashedPassword.Equals(user.Password))
            {
                throw new Exception("Incorrect");
            }

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecretKey"]));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public void Register(RegisterRequest request)
        {
            byte[] salt = new byte[256 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: request.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: int.Parse(_configuration["iterations"]),
                numBytesRequested: 512 / 8));

            _reposistory.AddUser(new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                Password = hashedPassword,
                Salt = Convert.ToBase64String(salt)
            });
        }
    }
}
