using EmpProfileMatrixAPP.Server.Models;

namespace EmpProfileMatrixAPP.Server.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(int id);
        Task<bool> EmployeeExistsAsync(int id);
    }
}
