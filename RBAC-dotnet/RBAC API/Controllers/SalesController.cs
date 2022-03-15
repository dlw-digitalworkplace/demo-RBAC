using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBAC_API.Models;
using SIBE.Technidoco.WebAPI.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RBAC_API.Controllers
{
    [Authorize]
    [Route("api/sales")]
    [ApiController]
    public class SalesController : Controller
    {
        [HttpGet]
        [Authorize(Roles = "Management.Sales")]
        //[AuthorizeRoles("Administraion", "Management.Sales")]
        public ActionResult<IEnumerable<Sale>> GetSales()
        {
            var saleList = new List<Sale>();
            for (int i = 1; i <= 10; i++)
            {
                saleList.Add(new Sale()
                {
                    Id = i ,
                    ProductName = $"Product {i}",
                    AmountSold = 10 + (i * 10),
                    TotalProfit = 10 + (i * 10) * 2
                });
            }

            return Ok(saleList);
        }
    }
}
