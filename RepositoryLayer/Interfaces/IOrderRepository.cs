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
        List<Order> GetOrders();

        List<Order> GetUserOrders(int id);

        void CreateOrder(Order order);

        void ChangeOrderStatus(int id, string status);
    }
}
