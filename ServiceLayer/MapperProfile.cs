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

            CreateMap<Order, OrderResponse>()
                .ForMember(x => x.TotalCost, y => y.MapFrom(s => GetTotalCost(s.OrderProducts)))
                .ForMember(x => x.Count, y => y.MapFrom(s => s.OrderProducts.Sum(x => x.Count)));

            CreateMap<Order, OrderDetailsResponse>()
                .ForMember(x => x.TotalCost, y => y.MapFrom(s => GetTotalCost(s.OrderProducts)))
                .ForMember(x => x.OrderProducts, y => y.MapFrom(s => s.OrderProducts.Select(x => new OrderProductResponse
                {
                    Id = x.Product.Id,
                    Name = x.Product.Name,
                    Description = x.Product.Description,
                    Cost = x.Product.Cost,
                    Brand = x.Product.Brand.Name,
                    Count = x.Count
                })));
        }

        public decimal GetTotalCost(ICollection<OrderProduct> orderProducts)
        {
            decimal totalCost = 0;
            foreach (OrderProduct x in orderProducts)
            {
                totalCost += x.Count * x.Product.Cost;
            }

            return totalCost;
        }
    }
}