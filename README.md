# RAWG Games Database - SPA Project

Single Page Application (SPA) for browsing video games using the RAWG API.

## Technologies

- **Vite** (instead of Webpack) - Build tool and dev server
- **Vanilla JavaScript** - No framework
- **SCSS** - Styling with variables and mixins
- **RAWG API** - Video games database

## API Documentation

- **Documentation**: [https://api.rawg.io/docs/](https://api.rawg.io/docs/)
- **OpenAPI Spec**: [https://api.rawg.io/docs/?format=openapi](https://api.rawg.io/docs/?format=openapi)
- **API Key**: Required - Get yours at [https://rawg.io/apidocs](https://rawg.io/apidocs)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your RAWG API key:
```
VITE_RAWG_API_KEY=your_api_key_here
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

- **PageList** - Template for displaying game lists
- **PageDetail** - Template for displaying game details
- Custom router using hash-based navigation

## Resources

- **Design Mockups**: [Google Drive](https://drive.google.com/open?id=1VRJEUEv4Ybz9lI7NDFqMd2ctrPKUM6G8)
- **Logos**: SVG files provided in the mockups folder

## Key Differences from Original Project

- **Vite** is used instead of **Webpack** for better performance and developer experience
- All imports use ES6 modules (`import/export`) instead of HTML script tags
