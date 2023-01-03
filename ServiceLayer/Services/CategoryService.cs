using AutoMapper;
using RepositoryLayer.Interfaces;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class CategoryService : ICategory
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository category, IMapper mapper) 
        {
            _repository = category;
            _mapper = mapper;
        }

        public async Task<List<CategoryResponse>> GetProductsCategories()
        {
            return _mapper.Map<List<CategoryResponse>>(await _repository.GetCategories());
        }
    }
}
