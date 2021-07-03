using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Doritos.Models
{
    public class ToDoContext:DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public ToDoContext(DbContextOptions<ToDoContext> options): base(options)
        {
            // Database.SetInitializer<SchoolDBContext>(null);
        }

       // public string tablename = "ToDoItem";
/*        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoItem>()
                .ToTable("ToDoItem")
                .HasKey(s => s.Id);
        }*/

      /*  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost:5432;Database=ritasdatabase;Username=postgres;Password=PostGress123."); //, optionsBuilder => optionsBuilder.);*/
    }
}
