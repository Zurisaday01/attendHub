# Use the .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/nightly/sdk:9.0-alpine-aot AS build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers.  Use the same COPY
# for every dockerfile in the project to take advantage of Docker caching
COPY attendhub.sln attendhub.sln
COPY src/EmployeeService/EmployeeService.csproj src/EmployeeService/EmployeeService.csproj
COPY src/AttendanceService/AttendanceService.csproj src/AttendanceService/AttendanceService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj

# Restore package deps
RUN dotnet restore attendhub.sln

# Copy the app folders over
COPY src/IdentityService src/IdentityService

# Publish the application in Release mode
WORKDIR /app/src/IdentityService
RUN dotnet publish -c Release -o /app/src/out

# Use the .NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/nightly/sdk:9.0-alpine-aot AS final
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/src/out .

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "IdentityService.dll"]