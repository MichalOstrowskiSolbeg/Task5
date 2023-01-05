using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Order>> GetOrders()
        {
            return await _context.Orders.Include(x => x.OrderProducts).ThenInclude(x => x.Product).ToListAsync();
        }

        public async Task<List<Order>> GetUserOrders(int id)
        {
            return await _context.Orders.Include(x => x.OrderProducts).ThenInclude(x => x.Product).Where(x => x.UserId == id).ToListAsync();
        }

        public async Task ChangeOrderStatus(int id, string status)
        {
            var order = _context.Orders.First(x => x.Id == id);
            order.Status = status;
            await _context.SaveChangesAsync();
        }

        public async Task<int> CreateOrder(Order order)
        {
            var result = await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return result.Entity.Id;
        }

        public async Task<Order> GetOrder(int id)
        {
            return await _context.Orders.Include(x => x.OrderProducts).ThenInclude(x => x.Product).ThenInclude(x => x.Brand).FirstAsync(x => x.Id == id);
        }
    }
}
