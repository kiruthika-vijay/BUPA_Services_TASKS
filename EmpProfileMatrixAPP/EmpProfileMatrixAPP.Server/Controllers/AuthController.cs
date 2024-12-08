using EmpProfileMatrixAPP.Server.Data;
using EmpProfileMatrixAPP.Server.DTO;
using EmpProfileMatrixAPP.Server.Exceptions;
using EmpProfileMatrixAPP.Server.Interfaces;
using EmpProfileMatrixAPP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopSiloAppFSD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AauthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IEmployeeRepository _userRepository;

        private readonly EmployeeDbContext _context;
        public AauthController(IConfiguration configuration, EmployeeDbContext context, IEmployeeRepository userRepository)
        {
            _config = configuration;
            _context = context;
            _userRepository = userRepository;
        }

        [NonAction]
        public Employee Validate(string identifier, string password)
        {

            Employee s = _context.Employees
                .FirstOrDefault(i => (i.Email == identifier || i.Username == identifier) && i.Password == password);

            return s;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto request)
        {
            IActionResult response = Unauthorized();

            var s = Validate(request.Email, request.Password);
            if (s != null)
            {

                var issuer = _config["Jwt:Issuer"];
                var audience = _config["Jwt:Audience"];
                var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
                var signingCredentials = new SigningCredentials(
                                        new SymmetricSecurityKey(key),
                                        SecurityAlgorithms.HmacSha512Signature);

                var subject = new ClaimsIdentity(new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sub, s.Username),
                    new Claim(JwtRegisteredClaimNames.Email,s.Email)
                    });

                var expires = DateTime.UtcNow.AddMinutes(30);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = subject,
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = signingCredentials
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);

                return Ok(jwtToken);

            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequestDto request)
        {
            // Validate the incoming request
            if (request == null || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password) || string.IsNullOrWhiteSpace(request.Username))
            {
                return BadRequest("Invalid user data.");
            }

            // Check if the user already exists
            var existingUser = _context.Employees.FirstOrDefault(u => u.Email == request.Email || u.Username == request.Username);
            if (existingUser != null)
            {
                return Conflict("User already exists.");
            }

            // Create a new user
            var newUser = new Employee
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Username = request.Username,
                Dob = request.Dob,
                Age = request.Age,
                Salary = request.Salary,
                Password = request.Password
            };

            // Add the new user to the database
            _context.Employees.Add(newUser);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Login), new { email = newUser.Email }, newUser);
        }

        private string GenerateJwtToken(Employee user)
        {
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                                        new SymmetricSecurityKey(key),
                                        SecurityAlgorithms.HmacSha512Signature);

            var subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            });

            var expires = DateTime.UtcNow.AddDays(7);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}