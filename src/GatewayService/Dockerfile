# Use the .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/nightly/sdk:9.0-alpine-aot AS build
WORKDIR /app
EXPOSE 80

# Copy solution and project files
COPY attendhub.sln attendhub.sln
COPY src/EmployeeService/EmployeeService.csproj src/EmployeeService/EmployeeService.csproj
COPY src/AttendanceService/AttendanceService.csproj src/AttendanceService/AttendanceService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj

# Restore package dependencies for the solution
RUN dotnet restore attendhub.sln

# Copy the app folders over
COPY src/GatewayService src/GatewayService

# Publish the application in Release mode
WORKDIR /app/src/GatewayService
RUN dotnet publish -c Release -o /app/src/out

# Use the .NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/nightly/sdk:9.0-alpine-aot AS final
WORKDIR /app

# Copy the published app from the build stage
COPY --from=build /app/src/out .

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "GatewayService.dll"]
