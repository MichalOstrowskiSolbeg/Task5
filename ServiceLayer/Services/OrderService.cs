using AutoMapper;
using RepositoryLayer.Interfaces;
using RepositoryLayer.Models;
using ServiceLayer.Common;
using ServiceLayer.DTO.Requests;
using ServiceLayer.DTO.Responses;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;

namespace ServiceLayer.Services
{
    public class OrderService : IOrder
    {
        private readonly IOrderRepository _repository;
        private readonly IOrderProductRepository _repositoryOrderProduct;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IMapper mapper) 
        {
            _repository = orderRepository;
            _repositoryOrderProduct = orderProductRepository;
            _mapper = mapper;
        }

        public async Task<List<OrderResponse>> GetOrders()
        {
            return _mapper.Map<List<OrderResponse>>(await _repository.GetOrders());
        }

        public async Task<List<OrderResponse>> GetOrders(int id)
        {
            return _mapper.Map<List<OrderResponse>>(await _repository.GetUserOrders(id));
        }

        public async Task<OrderDetailsResponse> GetOrderDetails(int id)
        {
            return _mapper.Map<OrderDetailsResponse>(await _repository.GetOrder(id));
        }

        public async Task CreateOrder(List<ShoppingRequest> request, int userId)
        {
            if(request == null)
            {
                throw new ArgumentNullException("Something went wrong :(");
            }

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var orderId = await _repository.CreateOrder(new Order
                    {
                        UserId = userId,
                        Status = OrderStatus.Pending.ToString()
                    });

                    await _repositoryOrderProduct.AddProducts(
                        request.Select(x => new OrderProduct
                        {
                            OrderId = orderId,
                            ProductId = x.Product.Id,
                            Count = x.Count
                        }).ToList()
                    );

                    transaction.Complete();
                }
                catch (Exception)
                {
                    transaction.Dispose();
                    throw new Exception("Something went wrong :(");
                }

                transaction.Dispose();
            }
        }

        public async Task ChangeOrderStatus(int id, OrderStatus status)
        {
            await _repository.ChangeOrderStatus(id, status.ToString());
        }
    }
}
