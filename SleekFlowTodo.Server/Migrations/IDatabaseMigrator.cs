using Microsoft.EntityFrameworkCore;
using SleekFlowTodo.Server.Common;
using System.Runtime.CompilerServices;

namespace SleekFlowTodo.Server.Migrations
{
    public interface IDatabaseMigrator
    {
        void StartMigrate();
    }

    public class DatabaseMigrator(ApplicationDbContext applicationDbContext,
    SettingsDbContext settingsDbContext) : IDatabaseMigrator
    {
        private readonly ApplicationDbContext applicationDbContext = applicationDbContext;
        private readonly SettingsDbContext settingsDbContext = settingsDbContext;

        public void StartMigrate()
        {
            applicationDbContext.Database.Migrate();
            settingsDbContext.Database.Migrate();
        }
    }
}
