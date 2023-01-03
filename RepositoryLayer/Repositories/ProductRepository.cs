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
            return await _context.Products.Include(x => x.Brand).Include(x => x.Category).FirstAsync(x => x.Id == id);
        }

        public async Task<List<Product>> GetProductsAsync(string searchParam, int min, int max)
        {
            return await _context.Products
                .Include(x => x.Brand)
                .Include(x => x.Category)
                .Where(x => 
                (x.Name.ToLower().Contains(searchParam.ToLower()) || x.Description.ToLower().Contains(searchParam.ToLower())) 
                && x.Cost >= min 
                && x.Cost <= max
                )
                .OrderBy(x => x.Name)
                .ToListAsync();
        }

        public async Task<Brand> GetProductsBrands()
        {
            return await _context.Brands.Where(x => x.Products.Any()).FirstAsync();
        }
    }
}
