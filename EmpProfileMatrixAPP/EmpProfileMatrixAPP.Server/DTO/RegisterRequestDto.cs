namespace EmpProfileMatrixAPP.Server.DTO
{
    public class RegisterRequestDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public DateOnly Dob {  get; set; }
        public int Age { get; set; }
        public decimal Salary { get; set; }
        public string? Password { get; set; }
    }
}
