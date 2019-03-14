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

        [HttpGet("{id}")]
        public IActionResult AllTasks(int id)
        {
            return Ok(Logic.AllTasks(id));
        }

        [HttpGet("/one/{id}")]
        public IActionResult GetSingleTask(string id)
        {
            return Ok(Logic.GetTask(id));
        }

        [HttpDelete]
        public IActionResult DeleteTasks([FromBody] List<string> list)
        {
            Logic.DeleteTasks(list);
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