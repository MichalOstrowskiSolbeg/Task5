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
            var products = await _repository.GetProductsAsync();

            products = products
                .Where(x =>
                (request.Search == null || x.Name.ToLower().Contains(request.Search.ToLower()) || x.Description.ToLower().Contains(request.Search.ToLower()))
                && (string.IsNullOrEmpty(request.Category) || x.Category.Name.Equals(request.Category))
                && (string.IsNullOrEmpty(request.Brand) || x.Brand.Name.Equals(request.Brand))
                && x.Cost >= request.PriceFrom
                && x.Cost <= request.PriceTo
                ).ToList();

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
