using FluentValidation;
using ServiceLayer.DTO.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Validators
{
    public class ShoppingRequestValidator : AbstractValidator<ShoppingRequest>
    {
        public ShoppingRequestValidator()
        {
            RuleFor(x => x.Count).GreaterThan(0);

            RuleFor(x => x.Product).NotEmpty();
        }
    }
}