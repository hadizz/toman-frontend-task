# Payment Application

This project is a React front-end assignment designed to fetch and display payment data from a backend API. The application allows searching, filtering, pagination, and preserves state after reloading the page.

## Getting Started

### Backend Setup
To get the backend running:
1. Navigate to the `backend` directory.
2. Install dependencies by running:
    ```bash
    npm install
    ```
3. Start the backend server with:
    ```bash
    npm start
    ```

The backend will run on `http://localhost:8000`.

### Frontend Setup
You can create the frontend with your preferred tool, such as CRA or Vite. Follow the instructions in the assignment document to implement the front-end pages.

## API Endpoints

- **GET `/payments`**: Fetch a list of payments with optional pagination, search, and filtering.
  - Query parameters:
    - `search`: Search by payment type or description (e.g., `/payments?search=bonus`).
    - `type`: Filter by payment type (e.g., `/payments?type=salary`).
    - `status`: Filter by payment status (e.g., `/payments?status=success`).
    - `page` and `limit`: Pagination controls (e.g., `/payments?page=2&limit=10`).
  
- **GET `/payments/:id`**: Fetch the details of a specific payment by its ID.

## Status and Type Mappings

### Payment Statuses 🛠️
- `success`: The payment has been successfully processed.
- `pending`: The payment is in progress and has not been completed yet.
- `failed`: The payment attempt was not successful.

### Payment Types 💼
- `salary`: Regular salary payment.
- `bonus`: Any additional compensation outside the regular salary (e.g., performance or holiday bonuses).
- `commission`: Payment based on performance or sales.
- `transportation`: Reimbursements or allowances related to transport (e.g., taxi, bus fare).
- `overtime`: Payment for hours worked beyond regular hours.

## Features 🧩
- **Search**: Find payments by description.
- **Filters**: Filter payments by type and status.
- **Pagination**: View results across multiple pages.
- **State Persistence**: The state of the search, filters, and pagination is preserved after reloading the page.