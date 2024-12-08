using EmpProfileMatrixAPP.Server.Exceptions;
using EmpProfileMatrixAPP.Server.Interfaces;
using EmpProfileMatrixAPP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace EmpProfileMatrixAPP.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(IEmployeeRepository employeeRepository, ILogger<EmployeesController> logger)
        {
            _employeeRepository = employeeRepository;
            _logger = logger;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            try
            {
                _logger.LogInformation("Fetching all employees.");
                var employees = await _employeeRepository.GetAllEmployeesAsync();
                return Ok(employees);
            }
            catch (RepositoryException ex)
            {
                _logger.LogError(ex, "Error fetching employees.");
                return StatusCode(500, "Internal server error occurred while retrieving employees.");
            }
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            try
            {
                _logger.LogInformation("Fetching employee with ID {EmployeeId}.", id);
                var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (employee == null)
                {
                    return NotFound($"Employee with ID {id} not found.");
                }

                return Ok(employee);
            }
            catch (RepositoryException ex)
            {
                _logger.LogError(ex, "Error fetching employee with ID {EmployeeId}.", id);
                return StatusCode(500, "Internal server error occurred while retrieving the employee.");
            }
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid employee data.");
            }

            try
            {
                _logger.LogInformation("Adding a new employee.");
                await _employeeRepository.AddEmployeeAsync(employee);
                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.EmpId }, employee);
            }
            catch (ValidationException ex)
            {
                _logger.LogWarning(ex, "Validation error occurred while adding employee.");
                return BadRequest(ex.Message);
            }
            catch (RepositoryException ex)
            {
                _logger.LogError(ex, "Error adding employee.");
                return StatusCode(500, "Internal server error occurred while adding the employee.");
            }
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid employee data.");
            }

            try
            {
                _logger.LogInformation("Updating employee with ID {EmployeeId}.", id);
                var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (existingEmployee == null)
                {
                    return NotFound($"Employee with ID {id} not found.");
                }

                // Update fields
                existingEmployee.Username = employee.Username;
                existingEmployee.FirstName = employee.FirstName;
                existingEmployee.LastName = employee.LastName;
                existingEmployee.Email = employee.Email;
                existingEmployee.Dob = employee.Dob;
                existingEmployee.Salary = employee.Salary;

                await _employeeRepository.UpdateEmployeeAsync(existingEmployee);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                _logger.LogWarning(ex, "Employee with ID {EmployeeId} not found.", id);
                return NotFound(ex.Message);
            }
            catch (RepositoryException ex)
            {
                _logger.LogError(ex, "Error updating employee with ID {EmployeeId}.", id);
                return StatusCode(500, "Internal server error occurred while updating the employee.");
            }
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                _logger.LogInformation("Deleting employee with ID {EmployeeId}.", id);
                var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);

                if (existingEmployee == null)
                {
                    return NotFound($"Employee with ID {id} not found.");
                }

                await _employeeRepository.DeleteEmployeeAsync(id);
                return NoContent();
            }
            catch (NotFoundException ex)
            {
                _logger.LogWarning(ex, "Employee with ID {EmployeeId} not found.", id);
                return NotFound(ex.Message);
            }
            catch (RepositoryException ex)
            {
                _logger.LogError(ex, "Error deleting employee with ID {EmployeeId}.", id);
                return StatusCode(500, "Internal server error occurred while deleting the employee.");
            }
        }
    }
}
