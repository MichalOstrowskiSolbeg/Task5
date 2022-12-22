using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Cost { get; set; }

        public virtual Brand Brand { get; set; } = null!;
    }
}
