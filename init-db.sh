#!/bin/bash

# Set the database username (ensure this is the correct one)
PGUSER=${PGUSER:-postgres}

# Function to check if a database exists
database_exists() {
    psql -U $PGUSER -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$1'" | grep -q 1
}

# List of services and their respective project directories
SERVICES=(
    "EmployeeService:/src/EmployeeService"
    "AttendanceService:/src/AttendanceService"
    "IdentityService:/src/IdentityService"
)

# List of databases to create
DATABASES=("EmployeeDb" "AttendanceDb" "IdentityDb")

# Loop over the list of databases and create them if they don't exist
for DB in "${DATABASES[@]}"
do
    if ! database_exists "$DB"; then
        echo "Database $DB does not exist. Creating..."
        createdb -U $PGUSER "$DB"
    else
        echo "Database $DB already exists. Skipping creation."
    fi
done

# Run any restoration process if needed
echo "Restoring backups into databases..."
psql -U $PGUSER -d EmployeeDb -f /backups/attendance_backup.sql
psql -U $PGUSER -d AttendanceDb -f /backups/employee_backup.sql
psql -U $PGUSER -d IdentityDb -f /backups/identity_backup.sql

echo "Backup restoration complete."

# Apply migrations for each service
echo "Applying migrations for each service..."

for SERVICE in "${SERVICES[@]}"
do
    # Extract service name and project directory
    SERVICE_NAME=$(echo $SERVICE | cut -d ':' -f 1)
    PROJECT_PATH=$(echo $SERVICE | cut -d ':' -f 2)

    echo "Applying migrations for $SERVICE_NAME at $PROJECT_PATH..."

    # Navigate to the service's project directory
    cd $PROJECT_PATH

    # Run the migration for the respective database
    dotnet ef database update --connection "Host=localhost;Database=${SERVICE_NAME}Db;Username=$PGUSER;Password=your_password"

    # Optional: Print success message
    echo "Migrations applied for $SERVICE_NAME."
done

echo "Database initialization and migration script complete."
