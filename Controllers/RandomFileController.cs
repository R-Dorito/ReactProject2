using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Doritos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RandomFileController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            RandomFile randomFile = new RandomFile
            {
                FirstVariable = "Hello",
                SecondVariable = "World"
            };
            return $"{randomFile.FirstVariable} {randomFile.SecondVariable}";
        }

    }
}
