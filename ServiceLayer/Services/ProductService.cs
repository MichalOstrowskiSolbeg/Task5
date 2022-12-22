using AutoMapper;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ProductService : IProduct
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ProductResponse> GetProduct(int id)
        {
            return _mapper.Map<ProductResponse>(await _repository.GetProduct(id));
        }

        public async Task<List<ProductResponse>> GetProducts()
        {
            return _mapper.Map<List<ProductResponse>>(await _repository.GetProductsAsync());
        }
    }
}
