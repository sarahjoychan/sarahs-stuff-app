import { Router } from "express";
import { prisma } from "../db";
import { error } from "console";

export const usersRouter = Router();

usersRouter.get("/", async (_req, res) => {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    res.json(users);
});

usersRouter.post("/", async (req, res) => {
    const { email, name } = req.body as { email?: string; name?: string };

    if (!email || !email.trim()) {
        return res.status(400).json({ error: "email is required" });
    }
    if (!name || !name.trim()) {
        return res.status(400).json({ error: "name is required" });
    }

    try {
        const created = await prisma.user.create({
            data: {
                email: email.trim().toLowerCase(),
                name: name.trim().toLowerCase(),
            },
        });
        res.status(201).json(created);
    } catch (e: any) {
        if (e?.code === "P2002") return res.status(409).json({ error: "email already exsists"});
        res.status(500).json({ error: "failed to create user" });
    }
});