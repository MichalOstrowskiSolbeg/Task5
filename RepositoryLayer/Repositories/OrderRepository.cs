using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MyDbContext _context;
        public OrderRepository(MyDbContext context)
        {
            _context = context;
        }

        public List<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }

        public List<Order> GetUserOrders(int id)
        {
            return _context.Orders.Where(x => x.UserId == id).ToList();
        }

        public async void ChangeOrderStatus(int id, string status)
        {
            var order = _context.Orders.First(x => x.Id == id);
            order.Status = status;
            await _context.SaveChangesAsync();
        }

        public void CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }
    }
}
