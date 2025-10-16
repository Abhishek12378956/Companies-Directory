# Companies Directory

A modern, responsive company directory application built with React, TypeScript, and Tailwind CSS. This application allows users to browse, search, and filter companies by various criteria such as industry, location, and company size.

##  Features

-  View a list of companies with key details
-  Search and filter companies by name, industry, and location
-  Fully responsive design that works on all devices
-  Fast and efficient data loading with mock API
-  Clean and modern UI with Tailwind CSS

##  Getting Started

### Prerequisites

- Node.js (v22.20.0)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

##  Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

##  Project Structure

```
project/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API clients
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── db.json             # Mock database
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

##  Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Fast development server and build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React
- [JSON Server](https://github.com/typicode/json-server) - Mock REST API for development

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment

This application can be easily deployed to [Netlify](https://www.netlify.com/). Follow these steps:

1. **Build the application** (if not already built):
   ```bash
   npm run build