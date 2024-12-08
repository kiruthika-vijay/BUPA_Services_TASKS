using EmpProfileMatrixAPP.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EmpProfileMatrixAPP.Server.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Salary)
                    .HasColumnType("decimal(18,2)") // Adjust precision and scale as needed
                    .IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }

    }
}
