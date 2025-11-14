# Restaurant Order Management

A simple and minimal React application for browsing restaurant menu items and managing orders with a shopping cart.

## Features

- Browse available menu items
- Search functionality to filter items
- Add items to cart
- Update item quantities in cart
- Remove items from cart
- View total price
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-order-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:

- Runs on pushes and pull requests to `main` and `develop` branches
- Tests the build with Node.js 18.x and 20.x
- Runs the linter
- Builds the project
- Deploys to GitHub Pages on pushes to `main` branch

### Setting up GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to Pages section
3. Select source as "GitHub Actions"
4. The workflow will automatically deploy on pushes to main branch

## Project Structure

```
restaurant-order-management/
├── src/
│   ├── components/
│   │   ├── ItemList.jsx    # Component for displaying menu items
│   │   └── Cart.jsx        # Component for shopping cart
│   ├── App.jsx             # Main application component
│   ├── App.css             # Application styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # CI/CD pipeline configuration
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- React 18
- Vite
- CSS3

## License

MIT
