# NihonAI

NihonAI is a web application currently under development for learning Japanese through manga.

The goal of the project is to bring together a manga reader, vocabulary mining, vocabulary management, and a spaced repetition review system into a single platform. It is also a personal project built to learn modern full-stack web development while creating a practical tool for studying Japanese.

> 🚧 This project is actively under development, and new features will be added over time.

## Current Features

- User authentication with Supabase Auth
- Email verification
- Protected routes
- Manual vocabulary management
- Responsive interface built with React and Tailwind CSS

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL *(coming soon)*
- ESLint

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env.local` file using `.env.example` as a reference and add your Supabase credentials.

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Roadmap

- [x] Initial project setup
- [x] Vocabulary management interface
- [x] Supabase authentication
- [ ] PostgreSQL persistence
- [ ] Manga library
- [ ] Manga reader
- [ ] Integrated OCR
- [ ] Vocabulary mining
- [ ] Spaced repetition system
- [ ] AI-powered features

## License

This project is developed for educational and learning purposes.
