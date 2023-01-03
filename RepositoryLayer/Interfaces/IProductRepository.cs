﻿using RepositoryLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetProductsAsync(string searchParam, int min, int max);

        Task<Product> GetProduct(int id);
    }
}
