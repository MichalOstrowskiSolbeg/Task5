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
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("This field is required")
                .Length(2, 50).WithMessage("This field requires from 2 to 50 characters");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("This field is required")
                .Length(2, 50).WithMessage("This field requires from 2 to 50 characters");

            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("This field is required")
                .Length(2, 50).WithMessage("This field requires from 2 to 50 characters");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("This field is required")
                .Length(2, 20).WithMessage("This field requires from 2 to 20 characters");

            RuleFor(x => x.Password2)
                .NotEmpty().WithMessage("This field is required")
                .Length(2, 20).WithMessage("This field requires from 2 to 20 characters")
                .Equal(x => x.Password).WithMessage("Passwords are not the same");
        }
    }
}