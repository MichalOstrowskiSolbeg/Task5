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
    public class BrandRepository : IBrandRepository
    {
        private readonly MyDbContext _context;
        public BrandRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Brand>> GetBrands()
        {
            return await _context.Brands.Where(x => x.Products.Any()).ToListAsync();
        }
    }
}
