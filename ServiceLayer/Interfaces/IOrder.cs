using RepositoryLayer.Models;
using ServiceLayer.Common;
using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IOrder
    {
        Task CreateOrder(List<ShoppingRequest> request, int userId);

        Task<List<OrderResponse>> GetOrders();

        Task<List<OrderResponse>> GetOrders(int id);

        Task<OrderDetailsResponse> GetOrderDetails(int id);

        Task ChangeOrderStatus(int id, OrderStatus status);
    }
}
