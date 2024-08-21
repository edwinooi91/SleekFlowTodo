using Microsoft.EntityFrameworkCore;
using SleekFlowTodo.Server.Common;
using SleekFlowTodo.Server.Models;

namespace SleekFlowTodo.Server.Repositories
{
    public interface ITodoRepository
    {
        Task<IEnumerable<TodoModel>> GetTodoListAsync(string filter = "", string order = "");
        Task CreateAsync(TodoModel todo);
        Task UpdateAsync(TodoModel todo);
        Task DeleteAsync(Guid id);
    }

    public class TodoRepository(ApplicationDbContext applicationContext,
        CancellationToken cancellation = default)
        : ITodoRepository
    {
        private readonly ApplicationDbContext applicationContext = applicationContext;
        private readonly CancellationToken cancellation = cancellation;

        public async Task<IEnumerable<TodoModel>> GetTodoListAsync(string filter = "", string order = "")
        {
            var todoList = await applicationContext.TodoModel.ToListAsync(cancellation);

            if (!string.IsNullOrWhiteSpace(filter))
            {
                todoList = todoList.Where(x => x.Name.Contains(filter)).ToList();
            }

            if (!string.IsNullOrWhiteSpace(order))
            {
                todoList = order switch
                {
                    "dueDate_asc" => [.. todoList.OrderBy(x => x.DueDate)],
                    "dueDate_desc" => [.. todoList.OrderByDescending(x => x.DueDate)],
                    "name_asc" => [.. todoList.OrderBy(x => x.Name)],
                    "name_desc" => [.. todoList.OrderByDescending(x => x.Name)],
                    _ => todoList
                };
            }

            return todoList;
        }

        public async Task CreateAsync(TodoModel todo)
        {
            await applicationContext.TodoModel.AddAsync(todo, cancellation);
            await applicationContext.SaveChangesAsync(cancellation);
        }

        public async Task UpdateAsync(TodoModel todo)
        {
            applicationContext.TodoModel.Update(todo);
            await applicationContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var selectedItem = await applicationContext.TodoModel.FirstOrDefaultAsync(x => x.Id == id)
                ?? throw new Exception("Record not found.");

            applicationContext.TodoModel.Remove(selectedItem);
            await applicationContext.SaveChangesAsync(cancellation);
        }
    }
}
