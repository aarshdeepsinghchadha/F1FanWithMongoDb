using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDbWithDotnet.Services;

namespace MongoDbWithDotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly DriverService _driverService;

        public DriversController(DriverService driverService)
        {
            _driverService = driverService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDrivers()
        {
            var drivers =  await _driverService.GetAsync();
            return Ok(drivers); 
        }
    }
}
