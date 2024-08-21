using SleekFlowTodo.Server.Common;
using SleekFlowTodo.Server.Migrations;
using SleekFlowTodo.Server.Repositories;

namespace SleekFlowTodo.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services
                .AddDbContext<ApplicationDbContext>()
                .AddDbContext<SettingsDbContext>();
            builder.Services.AddScoped<IDatabaseMigrator, DatabaseMigrator>();
            builder.Services.AddScoped<ITodoRepository, TodoRepository>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using var scope = app.Services.CreateScope();
            scope.ServiceProvider.GetRequiredService<IDatabaseMigrator>().StartMigrate();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapDefaultControllerRoute();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
