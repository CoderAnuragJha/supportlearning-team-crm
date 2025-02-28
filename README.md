# SupportLearning Team CRM

A comprehensive Customer Relationship Management (CRM) system designed for learning support teams, featuring advanced case management and communication tracking capabilities.

## Features

- 📱 Responsive Design: Works seamlessly on both desktop and mobile devices
- 📊 Real-time Case Management: Track and manage support cases efficiently
- 💬 Conversation Tracking: Complete chat history between learners and support agents
- 📋 Survey Management: Collect and analyze feedback from learners
- 📚 Knowledge Base: Searchable repository of support articles
- 📈 Dashboard Analytics: Quick overview of key metrics
- ⏱️ SLA Tracking: Monitor first response and resolution times

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS with shadcn/ui components
- State Management: TanStack Query
- Routing: Wouter

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:CoderAnuragJha/supportlearning-team-crm.git
   cd supportlearning-team-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file based on `.env.example`:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and hooks
│   │   └── App.tsx        # Main application component
├── server/
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts             # Database configuration
└── shared/
    └── schema.ts         # Shared types and database schema
```

## API Endpoints

### Cases
- `GET /api/cases` - Get all cases
- `GET /api/cases/:id` - Get a specific case
- `POST /api/cases` - Create a new case
- `PATCH /api/cases/:id` - Update a case

### Conversations
- `GET /api/cases/:id/conversations` - Get conversations for a case
- `POST /api/cases/:id/conversations` - Add a conversation to a case

### Surveys
- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Create a new survey

### Knowledge Base
- `GET /api/knowledge` - Get all knowledge articles
- `GET /api/knowledge?q=search` - Search knowledge articles
- `POST /api/knowledge` - Create a new knowledge article

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.