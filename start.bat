@echo off
echo ===================================================
echo           Starting RenderAI Application
echo ===================================================

echo Starting Flask Backend Server on http://127.0.0.1:5000...
start "RenderAI Backend" cmd /k "cd backend && python app.py"

echo Starting Next.js Frontend Server on http://localhost:3000...
start "RenderAI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Application setup complete and starting!
echo Backend:  http://127.0.0.1:5000
echo Frontend: http://localhost:3000
echo ===================================================
