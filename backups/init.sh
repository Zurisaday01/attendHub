#!/bin/bash
# init.sh script to restore backups
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -U postgres -h postgres -p 5432; do
  echo "Waiting for PostgreSQL to become available..."
  sleep 6
done

# Define the databases and their respective backup files
declare -A databases=(
  ["EmployeeDb"]="/docker-entrypoint-initdb.d/employee_backup.sql"
  ["AttendanceDb"]="/docker-entrypoint-initdb.d/attendance_backup.sql"
)

# Check if the superuser exists and create it if not
echo "Checking if superuser 'zuryespadas' exists..."
if ! psql -U postgres -tc "SELECT 1 FROM pg_roles WHERE rolname = 'zuryespadas'" | grep -q 1; then
  echo "Creating superuser 'zuryespadas'..."
  psql -U postgres -d postgres -c "CREATE ROLE zuryespadas WITH LOGIN SUPERUSER;"
fi

# Loop through each database and restore the backup if it exists
for db in "${!databases[@]}"; do
  echo "Checking if database $db exists..."
  if ! psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$db'" | grep -q 1; then
    echo "Database $db does not exist. Creating it..."
    psql -U postgres -c "CREATE DATABASE \"$db\";"
  fi

  # Restore the database from the backup file
  echo "Restoring $db from backup..."
  psql -U postgres -d "$db" -f "${databases[$db]}"
done
