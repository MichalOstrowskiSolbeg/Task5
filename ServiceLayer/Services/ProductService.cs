using AutoMapper;
using RepositoryLayer;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Requests;
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

        public async Task<PaginatedResponse<ProductResponse>> GetProducts(ProductRequest request)
        {
            var products = await _repository.GetProductsAsync(request.Search, request.PriceFrom, request.PriceTo);
            if(!string.IsNullOrEmpty(request.Category) && !string.IsNullOrEmpty(request.Brand))
            {
                products = products.Where(x => x.Brand.Name.Equals(request.Brand) && x.Brand.Name.Equals(request.Brand)).ToList();
            }
            else if(!string.IsNullOrEmpty(request.Category))
            {
                products = products.Where(x => x.Category.Name.Equals(request.Category)).ToList();
            }
            else if (!string.IsNullOrEmpty(request.Brand))
            {
                products = products.Where(x => x.Brand.Name.Equals(request.Brand)).ToList();
            }
            
            return new PaginatedResponse<ProductResponse> {
                Results = _mapper.Map<List<ProductResponse>>(
                    products
                    .Skip((request.Page - 1) * PaginationValues.PAGE_SIZE)
                    .Take(PaginationValues.PAGE_SIZE)
                    ),
                PageCount = (int)Math.Ceiling(products.Count() / (double)PaginationValues.PAGE_SIZE),
                PageIndex = request.Page
            };
        }
    }
}
