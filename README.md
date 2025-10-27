# Country Data API

A RESTful API that fetches country data from external APIs, stores it in a MySQL database, and provides CRUD operations with additional features like image generation.

## Features

- Fetch country data from [RestCountries API](https://restcountries.com/)
- Fetch exchange rates from [ExchangeRate API](https://open.er-api.com/)
- Calculate estimated GDP based on population and exchange rates
- Store and manage country data in MySQL
- Generate summary images with top countries by GDP
- RESTful endpoints with filtering and sorting capabilities

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seyiFortress/Country-Data-API.git
   cd Country-Data-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   
   First, configure your database connection by copying the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your MySQL credentials:
   ```
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=country_api
   PORT=3000
   ```
   
   Create and set up the database:
   ```bash
   npm run setup-db
   ```
   
   For detailed database setup instructions, see [DATABASE_SETUP.md](DATABASE_SETUP.md).

4. Start the application:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```