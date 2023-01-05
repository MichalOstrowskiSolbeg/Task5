using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly MyDbContext _context;
        public OrderProductRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task AddProducts(List<OrderProduct> orderProducts)
        {
            await _context.OrderProducts.AddRangeAsync(orderProducts);
            await _context.SaveChangesAsync();
        }
    }
}
