import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/users";

const app = express();
app.use(cors({origin: "http://localhost:5173"})); //react dev server
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ ok: true, message: "server is healthy"});
});

app.use("/api/users", usersRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
    console.log(`api is listening on http://localhost:${PORT}`);
});