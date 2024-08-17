using System.ComponentModel.DataAnnotations.Schema;

namespace SleekFlowTodo.Server.Models
{
    [Table("User")]
    public class UserModel
    {
        required public Guid Id { get; set; }
        required public string Username { get; set; }
        required public string Password { get; set; }
        required public string UserRole { get; set; }
    }
}
