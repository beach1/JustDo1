using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using JustDo1.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace JustDo1.Controllers
{
	[Authorize(AuthenticationSchemes =
		JwtBearerDefaults.AuthenticationScheme)]
	[Route("api/[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ITaskLogic Logic;

		public TaskController(ITaskLogic logic)
		{
			Logic = logic;
		}

		[HttpGet("")]
		public IActionResult FilterTasks([FromQuery] int type, [FromQuery] string date, [FromQuery] bool @checked)
		{
			return Ok(Logic.FilterTasks(type, date, @checked));
		}

		[HttpGet("/one/{id}")]
		public IActionResult GetSingleTask(string id)
		{
			return Ok(Logic.GetTask(id));
		}

		[HttpGet("{id}/toggle")]
		public IActionResult ToggleTask(string id)
		{
			Logic.CheckTask(id);
			return Ok();
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteTask(string id)
		{
			Logic.DeleteTask(id);
			return Ok();
		}

		[HttpPut]
		public IActionResult EditSingleTask([FromBody]TaskModel task)
		{
			Logic.EditTask(task);
			return Ok();
		}

		[HttpPut("Create")]
		public IActionResult CreateSingleTask([FromBody]TaskModel task)
		{
			Logic.CreateTask(task);
			return Ok();
		}

	}
}