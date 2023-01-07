using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.DTO.Responses
{
    public class OrderDetailsResponse
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalCost { get; set; }
        public List<OrderProductResponse> OrderProducts { get; set; }
    }
}
