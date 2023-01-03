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
    public class BrandService : IBrand
    {
        private readonly IBrandRepository _repository;
        private readonly IMapper _mapper;
        public BrandService(IBrandRepository brandRepository, IMapper mapper) 
        {
            _repository = brandRepository;
            _mapper = mapper;
        }

        public async Task<List<BrandResponse>> GetProductsBrands()
        {
            return _mapper.Map<List<BrandResponse>>(await _repository.GetBrands());
        }
    }
}
