using Microsoft.AspNetCore.Mvc;
using SleekFlowTodo.Server.Models;
using SleekFlowTodo.Server.Repositories;

namespace SleekFlowTodo.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        [HttpGet("get")]
        public async Task<IEnumerable<TodoModel>> Get(string filter = "", string order = "")
        {
            return await todoRepository.GetTodoListAsync(filter, order);
        }


        [HttpPost("create")]
        public async Task<ActionResult> CreateAsync(TodoModel todo)
        {
            await todoRepository.CreateAsync(todo);
            return Ok();
        }

        [HttpPut("Update")]
        public async Task<ActionResult> UpdateAsync(TodoModel todo)
        {
            await todoRepository.UpdateAsync(todo);
            return Ok();
        }

        [HttpDelete("{todoId}")]
        public async Task<ActionResult> DeleteAsync(Guid todoId)
        {
            await todoRepository.DeleteAsync(todoId);
            return Ok();
        }
    }
}
