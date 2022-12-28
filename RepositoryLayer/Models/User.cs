using System;
using System.Collections.Generic;

namespace RepositoryLayer.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
        public string Salt { get; set; } = null!;
        public string Role { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
    }
}
