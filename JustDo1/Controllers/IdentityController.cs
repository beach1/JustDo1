using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using JustDo1.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace JustDo1.Controllers
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]

    public class IdentityController : ControllerBase
    {
        private readonly IIdentityLogic Logic;

        public IdentityController(IIdentityLogic logic)
        {
            Logic = logic;
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