# TaskFlow

TaskFlow is a modern, full-stack task and project management platform designed for individuals and teams who want to organize, track, and collaborate on their work efficiently. With an intuitive interface inspired by Kanban boards, TaskFlow enables users to create boards, lists, and tasks, assign responsibilities, upload images, and monitor progress in real time. The platform is built for scalability, security, and a seamless user experience across devices.

## Key Features
- Secure user authentication and profile management
- Create, edit, and delete boards, lists, and tasks
- Drag-and-drop task and list reordering
- Assign tasks to users (team collaboration)
- Upload images for boards and user profiles
- Responsive, modern dashboard UI
- Real-time updates and protected routes
- RESTful API backend with robust validation
- Analytics and productivity insights (extendable)

## Technologies Used

### Frontend
- **React** (with TypeScript) — UI development
- **Vite** — Fast build and development tooling
- **HeroUI** — Component library for modern UI/UX
- **Tailwind CSS** & **Tailwind Variants** — Utility-first styling and design system
- **Framer Motion** — Animations and transitions
- **React Router** — Routing and navigation
- **Context API** — State management
- **Axios** — HTTP client for API requests
- **js-cookie** — Cookie management for authentication
- **Lucide React** — Icon library

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — ODM for MongoDB
- **JWT (jsonwebtoken)** — Authentication and authorization
- **Multer** — File/image uploads
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Dev & Tooling
- **ESLint** — Linting and code quality
- **Prettier** — Code formatting
- **@typescript-eslint** — TypeScript linting
- **@heroui/theme** — Design tokens and theming
- **PostCSS** — CSS processing

## Project Structure
- `client/` — Frontend React application (UI, pages, components, styles)
- `server/` — Backend Express API (routes, controllers, models, services)

## How It Works
1. **Authentication:** Users register and log in securely. JWT tokens are used for protected routes and API calls.
2. **Boards & Lists:** Users can create multiple boards, each containing lists (columns) and tasks (cards). Boards and lists can be reordered via drag-and-drop.
3. **Tasks:** Tasks can be created, edited, deleted, and moved between lists. Each task can have a title, description, and status.
4. **Profile & Images:** Users can update their profile information and upload profile/board images.
5. **Collaboration:** (Extendable) The architecture supports multi-user boards and task assignment for teams.
6. **API:** All data operations are handled via a RESTful API with robust validation and error handling.

## Getting Started
1. Clone the repository.
2. Install dependencies in both `client` and `server` folders:
   - `npm install` (in each folder)
3. Configure environment variables as needed (see `.env.example` if provided).
4. Start the backend server (`npm run dev` or `node server.js` in `server/`).
5. Start the frontend (`npm run dev` in `client/`).

## License
This project is licensed under the MIT License.

---

© 2025 SkyRazur. All rights reserved.

For more details, see the `client/README.md` and `server/` documentation.
