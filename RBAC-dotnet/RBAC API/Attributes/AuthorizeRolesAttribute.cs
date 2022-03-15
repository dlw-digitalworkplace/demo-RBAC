using Microsoft.AspNetCore.Authorization;

namespace SIBE.Technidoco.WebAPI.Attributes
{
    public class AuthorizeRolesAttribute: AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params string[] roles): base()
        {
            Roles = string.Join(",", roles);
        }
    }
}
