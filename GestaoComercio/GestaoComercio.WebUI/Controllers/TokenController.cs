﻿using GestaoComercio.WebUI.Models.Usuario;
using GestaoComercio.WebUI.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestaoComercio.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IJwtTokenManager _tokenManager;
        public TokenController(IJwtTokenManager jwtTokenManager)
        {
            _tokenManager = jwtTokenManager;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody]UserCredential credential)
        {
            var token = _tokenManager.Authenticate(credential.UserName, credential.Password);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }
            return Ok(token);
        }
    }
}
