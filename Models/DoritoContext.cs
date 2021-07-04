using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Doritos.Models
{
    public class DoritoContext:DbContext
    {
        // Model first
        public DbSet<ToDoItem> ToDoItems { get; set; }
        public DbSet<Book> Books { get; set; }

        public DoritoContext(DbContextOptions<DoritoContext> options): base(options)
        {

        }
        /*
         Note:
            Collation is used to sort strings (text), for example by alphabetic order
         */
    }
}
