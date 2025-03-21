﻿using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("attendHubApp", "AttendHub app full access")
        };


    public static IEnumerable<Client> Clients(IConfiguration config) =>
        new Client[]
            {
            // m2m client credentials flow client
                new Client
                {
                    ClientId = "postman",
                    ClientName = "Postman",
                    AllowedScopes = {"openid", "profile", "attendHubApp"},
                    RedirectUris = {"https://www.getpostman.com/oauth2/callback"}, // doesn't matter because postman doesn't use it
                    ClientSecrets = new[] {new Secret("NotASecret".Sha256())},
                    AllowedGrantTypes = {GrantType.ResourceOwnerPassword}
                },
                new Client
                {
                    ClientId = "nextApp",
                    ClientName = "nextApp",
                    ClientSecrets = {new Secret("secret".Sha256())},
                    AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                    RequirePkce = false,
                    RedirectUris = {config["ClientApp"] + "/api/auth/callback/id-server"},
                    AllowOfflineAccess = true,
                    AllowedScopes = {"openid", "profile", "attendHubApp"},
                    AccessTokenLifetime = 3600*24*30,
                    AlwaysIncludeUserClaimsInIdToken = true
                }
        };
}