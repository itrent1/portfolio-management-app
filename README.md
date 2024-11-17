# Portfolio Management and News Aggregator Application

## Overview
This application is a portfolio management and news aggregator built with Node.js, Express.js, MongoDB, and EJS. It provides features like user authentication, portfolio creation, news aggregation, and inflation data visualization using external APIs.

## Features

1. **User Authentication**
   - Registration and login functionality.
   - Password hashing using bcrypt.
   - Session-based authentication with `express-session`.

2. **Portfolio Management**
   - Users can create, update, and delete portfolio items.
   - Supports image uploads (up to 3 images per portfolio item).

3. **News Aggregation**
   - Fetches top business headlines from NewsAPI.
   - Displays news in JSON format for further integration.

4. **Inflation Data Visualization**
   - Fetches inflation data from the World Bank API.
   - Filters and structures data for user-friendly display.

## Project Structure

```
project-directory/
├── routes/
│   ├── auth.js
│   ├── portfolio.js
│   └── api.js
├── models/
│   ├── user.js
│   └── PortfolioItem.js
├── middleware/
│   └── auth.js
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── portfolio.ejs
│   ├── inflation.ejs
│   └── news.ejs
├── public/
│   ├── css/
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── register.css
│   │   ├── portfolio.css
│   │   ├── inflation.css
│   │   └── news.css
│   └── (static assets)
├── uploads/
│   └── (uploaded images)
├── .env
├── server.js
├── README.md
├── package.json
└── package-lock.json
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Navigate to the project directory:
   ```bash
   cd project-name
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   NEWS_API_KEY=your_newsapi_key
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Dependencies

- **Backend:**
  - `express`
  - `mongoose`
  - `dotenv`
  - `bcrypt`
  - `express-session`
  - `axios`
  - `multer`
  - `method-override`

- **Frontend:**
  - `ejs`

- **Dev Tools:**
  - `nodemon` (optional for development)

## API Endpoints

### Authentication

- `GET /auth/register` - Registration page
- `POST /auth/register` - Register a new user
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user

### Portfolio Management

- `GET /portfolio` - View all portfolio items
- `POST /portfolio/create` - Create a new portfolio item
- `POST /portfolio/update/:id` - Update an existing portfolio item
- `POST /portfolio/delete/:id` - Delete a portfolio item

### API Routes

- `GET /api/inflation` - Fetch inflation data from the World Bank API
- `GET /api/news` - Fetch top news headlines

## Middleware

- **Authentication Middleware**
  ```javascript
  function ensureAuthenticated(req, res, next) {
      if (req.session && req.session.user) {
          return next();
      }
      res.redirect('/auth/login'); 
  }

  module.exports = ensureAuthenticated;
  ```
  Ensures that routes are protected and only accessible to authenticated users.

## Models

### User

```javascript
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
});
```

### PortfolioItem

```javascript
const portfolioItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    images: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
```

## Future Improvements

- Add role-based access control.
- Implement unit and integration tests.
- Enhance UI with modern frontend frameworks like React or Vue.js.
- Add support for more API integrations.

## License

This project is licensed under the MIT License.

