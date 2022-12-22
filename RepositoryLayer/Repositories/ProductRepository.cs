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
    public class ProductRepository : IProductRepository
    {
        private readonly MyDbContext _context;
        public ProductRepository(MyDbContext context) 
        {
            _context = context;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.Include(x => x.Brand).FirstAsync(x => x.Id == id);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.Include(x => x.Brand).OrderBy(x => x.Name).ToListAsync();
        }
    }
}
