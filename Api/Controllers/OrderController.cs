using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Common;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;
using System.Data;

namespace Api.Controllers
{
    public class OrderController : ApiControllerBase
    {
        private readonly IOrder _service;
        public OrderController(IOrder order)
        {
            _service = order;
        }

        //[Authorize(Roles = "client, admin")]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                if (IsAdmin())
                {
                    return Ok(await _service.GetOrders(GetUserId()));
                }
                return Ok(await _service.GetOrders());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            try
            {
                return Ok(await _service.GetOrderDetails(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeStatus(int id, OrderStatus status)
        {
            try
            {
                await _service.ChangeOrderStatus(id, status);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }
    }
}