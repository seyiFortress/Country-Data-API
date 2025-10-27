# Database Setup Guide

This guide will help you set up the MySQL database for the Country Data API project.

## Prerequisites

1. Make sure you have MySQL installed and running on your system
2. Have your MySQL root password ready (or create a dedicated MySQL user for this project)

## Setup Steps

### 1. Configure Database Connection

Edit the `.env` file in the project root and update the following variables:

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_actual_mysql_password_here
DB_NAME=country_api
PORT=3000
```

Replace `your_actual_mysql_password_here` with your actual MySQL root password.

### 2. Create the Database

Run the following command to create the database:

```bash
npm run create-db
```

This will create a database named `country_api` if it doesn't already exist.

### 3. Synchronize Models

Run the following command to create the necessary tables:

```bash
npm run sync-db
```

This will create the `countries` table based on the Sequelize model definition.

### 4. Complete Setup (All-in-One)

Alternatively, you can run both commands at once:

```bash
npm run setup-db
```

## Database Schema

The `countries` table will have the following structure:

| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| name | STRING | NOT NULL, UNIQUE |
| capital | STRING | NULLABLE |
| region | STRING | NULLABLE |
| population | BIGINT | NOT NULL |
| currency_code | STRING | NULLABLE |
| exchange_rate | DECIMAL(10,2) | NULLABLE |
| estimated_gdp | DECIMAL(20,2) | NULLABLE |
| flag_url | STRING | NULLABLE |
| last_refreshed_at | DATE | DEFAULT CURRENT_TIMESTAMP |

## Troubleshooting

### Access Denied Error

If you get an "Access denied" error, make sure:
1. Your MySQL server is running
2. The username and password in `.env` are correct
3. The user has privileges to create databases

### Connection Refused Error

If you get a "Connection refused" error:
1. Check that MySQL is running on the specified host
2. Verify the host and port in your `.env` file
3. Check if there are any firewall rules blocking the connection

## Alternative Setup

If you prefer to create the database manually, you can use the following SQL commands:

```sql
CREATE DATABASE IF NOT EXISTS country_api;
USE country_api;

CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  capital VARCHAR(255),
  region VARCHAR(255),
  population BIGINT NOT NULL,
  currency_code VARCHAR(10),
  exchange_rate DECIMAL(10,2),
  estimated_gdp DECIMAL(20,2),
  flag_url VARCHAR(500),
  last_refreshed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

After creating the database and tables manually, you can skip the `npm run create-db` and `npm run sync-db` commands.