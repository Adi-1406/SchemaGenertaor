# Schema Generator

A web-based schema generator that provides contextual schema recommendations for websites. This tool helps you generate optimized JSON-LD schemas by understanding your website's context and purpose.

## Features

- Generate schema.org compatible JSON-LD schemas
- Support for multiple schema types (Organization, LocalBusiness, Product, Article, etc.)
- Context-aware schema generation
- Real-time schema preview
- Copy-to-clipboard functionality

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Express.js
- Styling: Tailwind CSS + shadcn/ui
- Form Handling: React Hook Form + Zod
- State Management: TanStack Query

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/schema-generator.git
cd schema-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── lib/         # Utility functions and API client
│   │   └── pages/       # Page components
├── server/               # Express.js backend
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage implementation
└── shared/              # Shared types and schemas
    └── schema.ts        # Database schema and type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
