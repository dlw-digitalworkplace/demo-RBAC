using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RBAC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RBAC_API.Controllers
{
    [Authorize]
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            var productList = new List<Product>();
            var isAdministrator = HttpContext.User.IsInRole("Administration");

            for(int i = 0; i < 3; i++)
            {
                productList.Add(new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Price = 10 + (i * 10)
                });
            }

            return Ok(productList);
        }

    }
}
