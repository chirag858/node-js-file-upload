# Node.js File Upload & Data Processing API

This is a RESTful API built with Node.js, Express.js, and MongoDB. It allows users to upload CSV files, store the data in MongoDB, and retrieve it with filtering options.

## Features
- User authentication using JWT.
- CSV file upload and processing.
- CRUD operations for products.
- Filtering and pagination for product listings.
- Proper error handling and validation.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nodejs-file-upload-api.git
   cd nodejs-file-upload-api


#Create env file
PORT=3000
MONGO_URI=mongodb://localhost:27017/file_upload_api
JWT_SECRET=your_jwt_secret_key


#API Documentation
*Register User: POST /api/auth/register ,

{
  "username": "john_doe",
  "password": "password123"
}

*Login User: POST /api/auth/login ,

{
  "username": "john_doe",
  "password": "password123"
}

*Create Product: POST /api/products

{
  "product_name": "Laptop",
  "category": "Electronics",
  "price": 800,
  "stock": 10
}


* Get Products: GET /api/products?category=Electronics&minPrice=500&maxPrice=1000&page=1&limit=10

* Update Product: PUT /api/products/:id

{
  "product_name": "Updated Laptop",
  "price": 900
}


* Delete Product: DELETE /api/products/:id


*Upload CSV: POST /api/upload

Headers: Authorization: Bearer <JWT_TOKEN>

Body: Form-data with key file and value as the CSV file.

sample csv file is given in the code

