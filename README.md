# Full Stack Project

## Project Structure
- `back/` - Node.js Express backend
- `front/` - Next.js frontend

## Requirements
- Node.js 18+
- npm

## Setup Instructions

### Backend
1. Navigate to backend folder:
   ```bash
   cd back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend will run on http://localhost:3001

### Frontend
1. Navigate to frontend folder:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## Running the Full Application
1. Open two terminal windows
2. In terminal 1: `cd back && npm install && npm run dev`
3. In terminal 2: `cd front && npm install && npm run dev`
4. Open http://localhost:3000 in your browser

## Production Build and Launch

### Building for Production
1. Build the backend:
   ```bash
   cd back && npm install && npm run build
   ```

2. Build the frontend:
   ```bash
   cd front && npm install && npm run build
   ```

### Launching Production Servers
1. Start the backend production server:
   ```bash
   cd back && npm start
   ```
   Backend will run on http://localhost:3001

2. Start the frontend production server:
   ```bash
   cd front && npm start
   ```
   Frontend will run on http://localhost:3000

### Quick Production Launch
To build and launch both services in production mode:
```bash
# Terminal 1 - Backend
cd back && npm install && npm run build && npm start

# Terminal 2 - Frontend  
cd front && npm install && npm run build && npm start
```