using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class OrderService : IOrder
    {
        
        public OrderService() 
        {

        }

        public void CreateOrder(List<ShoppingRequest> request)
        {
            if(request == null)
            {
                throw new ArgumentNullException("Something went wrong :(");
            }

            throw new NotImplementedException();
        }
    }
}
