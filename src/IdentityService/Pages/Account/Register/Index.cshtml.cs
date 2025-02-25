using System.Security.Claims;
using Duende.IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityService.Pages.Register
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class Index(UserManager<ApplicationUser> userManager) : PageModel
    {
        [BindProperty] public RegisterViewModel Input { get; set; } = new();
        [BindProperty] public bool RegisterSuccess { get; set; }

        public IActionResult OnGet(string? returnUrl)
        {
            Input = new RegisterViewModel
            {
                ReturnUrl = returnUrl
            };

            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (Input.Button != "register") return Redirect("~/");

            Console.WriteLine("Before");

            if (ModelState.IsValid)
            {
                Console.WriteLine("After");
                var user = new ApplicationUser
                {
                    UserName = Input.Username,
                    Email = Input.Email,
                    EmailConfirmed = true
                };

                Console.WriteLine("Before CreateAsync", user.ToString());

                var result = await userManager.CreateAsync(user, Input.Password);


                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        // Add each error to ModelState
                        ModelState.AddModelError(string.Empty, error.Description);
                    }

                    RegisterSuccess = false;
                }


                if (result.Succeeded)
                {
                    Console.WriteLine("Success");
                    await userManager.AddClaimsAsync(user, new Claim[]
                    {
                        new Claim(JwtClaimTypes.Name, Input.FullName)
                    });

                    RegisterSuccess = true;
                }
            }

            return Page();
        }
    }
}