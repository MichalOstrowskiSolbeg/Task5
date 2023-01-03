using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Requests
{
    public class ProductRequest
    {
        public string Search { get; set; } = string.Empty;
        public int Page { get; set; } = 1;
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int PriceFrom { get; set; } = 0;
        public int PriceTo { get; set; } = int.MaxValue;
    }
}
