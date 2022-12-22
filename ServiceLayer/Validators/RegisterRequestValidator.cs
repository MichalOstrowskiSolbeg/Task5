using FluentValidation;
using ServiceLayer.DTO.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("This field cannot be empty");

            RuleFor(x => x.LastName).NotEmpty().WithMessage("This field cannot be empty");

            RuleFor(x => x.Username).NotEmpty().WithMessage("This field cannot be empty");

            RuleFor(x => x.Password).NotEmpty().WithMessage("This field cannot be empty");

            RuleFor(x => x.Password2).NotEmpty().WithMessage("This field cannot be empty").Equal(x => x.Password);
        }
    }
}