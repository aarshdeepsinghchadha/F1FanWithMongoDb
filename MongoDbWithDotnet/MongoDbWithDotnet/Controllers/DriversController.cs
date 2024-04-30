using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDbWithDotnet.Models;
using MongoDbWithDotnet.Models.ViewModels;
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

        //[HttpGet]
        //public async Task<IActionResult> GetDrivers()
        //{
        //    var drivers =  await _driverService.GetAsync();
        //    return Ok(drivers); 
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDriverById(string id)
        {
            var driver = await _driverService.GetDriverById(id);

            if (driver == null)
            {
                return NotFound();
            }

            return Ok(driver);
        }

        [HttpPost]
        public async Task<IActionResult> AddDriver([FromBody] AddDriverDto driverDto)
        {
            if (await _driverService.AddDriver(driverDto))
            {
                return Ok("Driver added successfully.");
            }
            else
            {
                return StatusCode(500, "An error occurred while adding the driver.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(string id, [FromBody] EditDriverDto driver)
        {
            if (string.IsNullOrWhiteSpace(id)) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updateResult = await _driverService.UpdateDriver(id, driver);
            if (updateResult)
            {
                return Ok("Driver updated successfully.");
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, "An error occurred while updating the driver.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(string id)
        {
            var deleteResult = await _driverService.DeleteDriver(id);
            if (deleteResult)
            {
                return Ok("Driver deleted successfully.");
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, "An error occurred while deleting the driver.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> FindDrivers([FromQuery] string? searchTerm)
        {
            var drivers = await _driverService.FindDrivers(searchTerm);
            return Ok(drivers);
        }

    }
}
