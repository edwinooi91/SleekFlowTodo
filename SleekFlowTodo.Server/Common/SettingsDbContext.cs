using Microsoft.EntityFrameworkCore;
using SleekFlowTodo.Server.Models;

namespace SleekFlowTodo.Server.Common
{
    public class SettingsDbContext : DbContext
    {
        private readonly IConfiguration configuration;

        public SettingsDbContext(DbContextOptions<SettingsDbContext> options, IConfiguration configuration)
            : base(options)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            base.OnConfiguring(options);
            options.UseNpgsql(configuration.GetConnectionString("Database"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasDefaultSchema("settings");
        }

        public DbSet<UserModel> UserModel { get; set; }
    }
}
