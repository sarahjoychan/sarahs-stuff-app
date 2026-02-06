import dotenv from 'dotenv';
//load enviroment variables
dotenv.config();
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { usersRouter } from "./routes/users";

const app = express();
console.log("SERVER BOOT MARKER: index.ts loaded at", new Date().toISOString());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); //react dev server

app.use(express.json());

// clerk middleware
app.use(clerkMiddleware());

//Public route (no auth needed)
app.get("/api/health", (_req, res) => {
    res.json({ ok: true, message: "server is healthy"});
});

//Protected routes (auth required)
app.use("/api/users", requireAuth(), usersRouter);

app.use((err: any, _req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.error("GLOBAL ERROR:", err?.message);
  console.error(err);
  next(err);
});


//Error handling for auth failures
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.status === 401) {
        res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    } else {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`api is listening on http://localhost:${PORT}`);
});