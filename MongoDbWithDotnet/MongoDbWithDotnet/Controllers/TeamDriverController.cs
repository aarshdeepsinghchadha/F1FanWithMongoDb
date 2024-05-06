using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDbWithDotnet.Models.ViewModels;
using MongoDbWithDotnet.Services;

namespace MongoDbWithDotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamDriverController : ControllerBase
    {
        private readonly DriverTeamService _driverTeamService;
        public TeamDriverController(DriverTeamService driverTeamService)
        {
            _driverTeamService = driverTeamService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamById(string id)
        {
            var driverTeam = await _driverTeamService.GetDriverTeamById(id);

            if (driverTeam == null)
            {
                return NotFound();
            }

            return Ok(driverTeam);
        }

        [HttpPost]
        public async Task<IActionResult> AddDriverTeam([FromBody] AddDriverTeamDto addDriverTeamDto)
        {
            if (await _driverTeamService.AddDriverTeam(addDriverTeamDto))
            {
                return Ok("Team added successfully.");
            }
            else
            {
                return StatusCode(500, "An error occurred while adding the Team.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(string id, [FromBody] EditDriverTeamDto editDriverTeamDto)
        {
            if (string.IsNullOrWhiteSpace(id)) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updateResult = await _driverTeamService.UpdateDriverTeam(id, editDriverTeamDto);
            if (updateResult)
            {
                return Ok("Team updated successfully.");
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, "An error occurred while updating the team.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(string id)
        {
            var deleteResult = await _driverTeamService.DeleteDriverTeam(id);
            if (deleteResult)
            {
                return Ok("Team deleted successfully.");
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, "An error occurred while deleting the team.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> FindTeams([FromQuery] string? searchTerm)
        {
            var teams = await _driverTeamService.FindTeam(searchTerm);
            return Ok(teams);
        }
    }
}
