using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IUser
    {
        LoginResponse Login(LoginRequest request);

        void Register(RegisterRequest request);
    }
}
