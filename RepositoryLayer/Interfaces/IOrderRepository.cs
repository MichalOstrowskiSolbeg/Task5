using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetOrders();

        Task<List<Order>> GetUserOrders(int id);

        Task<Order> GetOrder(int id);

        Task<int> CreateOrder(Order order);

        Task ChangeOrderStatus(int id, string status);
    }
}
