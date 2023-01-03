using AutoMapper;
using RepositoryLayer.Models;
using ServiceLayer.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductResponse>()
                .ForMember(x => x.Brand, y => y.MapFrom(s => s.Brand.Name))
                .ForMember(x => x.Category, y => y.MapFrom(s => s.Category.Name));

            CreateMap<Brand, BrandResponse>()
                .ForMember(x => x.Brand, y => y.MapFrom(s => s.Name));

            CreateMap<Category, CategoryResponse>()
                .ForMember(x => x.Category, y => y.MapFrom(s => s.Name));
        }
    }
}