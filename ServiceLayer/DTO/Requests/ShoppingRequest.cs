using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Requests
{
    public class ShoppingRequest
    {
        public ProductResponse Product { get; set; }
        public int Count { get; set; }
    }
}
