using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JustDo1.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace JustDo1.Controllers
{
    [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private ILogic Logic;

        public AppController(ILogic logic)
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
        public IActionResult DeleteSingleTask([FromBody] List<string> list)
        {
            Logic.DeleteTask(list);
            return Ok("success");
        }
        [HttpPut]
        public IActionResult EditSingleTask([FromBody]TaskModel task)
        {
            Logic.EditTask(task);
            return Ok("success");
        }
        [HttpPut("Create")]
        public IActionResult CreateSingleTask([FromBody]TaskModel task)
        {
            Logic.CreateTask(task);
            return Ok("success");
        }
        [AllowAnonymous]
        [HttpPost("SignIn")]
        public IActionResult SignIn([FromBody] CredentialsModel cred)
        {
            var success = Logic.SignIn(cred);
            if (success==null)
            {
                return NotFound();
            }
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: success.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return Ok(encodedJwt);
        }
        [AllowAnonymous]
        [HttpPost("ForgetPass")]
        public IActionResult ForgetPass([FromBody] CredentialsModel cred)
        {
            var success = Logic.ForgetPass(cred.Email);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost("ResetPass")]
        public IActionResult ResetPass([FromBody] ResetCredentialsModel cred)
        {
            var success = Logic.ResetPass(cred);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPost("ChangePass")]
        public IActionResult ChangePass([FromBody] ChangeCredentialsModel cred)
        {
            var success = Logic.ChangePass(cred);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost("SignUp")]
        public IActionResult SignUp([FromBody] CredentialsModel cred)
        {
            var success = Logic.SignUp(cred);
            if (!success)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}