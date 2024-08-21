using System.ComponentModel.DataAnnotations.Schema;

namespace SleekFlowTodo.Server.Models
{
    [Table("Todo")]
    public class TodoModel
    {
        required public Guid Id { get; set; }
        required public string Name { get; set; }
        required public string Description { get; set; }
        required public DateOnly DueDate { get; set; }
        required public Status Status { get; set; }
    }

    public enum Status
    {
        NotStarted,
        InProgress,
        Completed,
    }
}
