import { Router } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { prisma } from "../db";
import { error } from "console";

export const usersRouter = Router();

// get logged in user profile
usersRouter.get("/me", async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        //get user from clerk
        const clerkUser = await clerkClient.users.getUser(userId);
        const email =
            clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)
                ?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;
        if (!email) return res.status(400).json({ error: "no email found on clerk user" });
        const username = clerkUser.username ?? null;
        const fullName =
            `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null;
        const name = fullName || username || null;

        //Upesert is simpler than find+create
        const user = await prisma.user.upsert({
            where: { clerkId: userId },
            update: { 
                email: email.toLowerCase(), 
                name,
                username 
            },
            create: { 
                clerkId: userId, 
                email: email.toLowerCase(), 
                name,
                username 
            },
        });
        return res.json(user);
    } catch (err: any) {
        console.error("ROUTE ERROR /api/users/me:", err?.message);
        console.error(err?.stack);
        console.error(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err?.message,
        });
    }
});

// get all users (protected route)
usersRouter.get('/', async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });

        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(users);
    } catch (err: any) {
        console.error("ROUTE ERROR /api/users:", err?.message);
        console.error(err?.stack);
        console.error(err);
        return res.status(500).json({ error: "Internal server error", message: err?.message });
    }
});


// Create user endpoint (you might not need this anymore since Clerk handles signup)
// But keeping it here in case you need manual user creation for admin purposes
usersRouter.post("/", async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: 'User not authenticated' });
        
        const { email, name, clerkId } = req.body as { 
            email?: string; 
            name?: string;
            clerkId?: string;
        };

        if (!email || !email.trim()) return res.status(400).json({ error: "email is required" });
        if (!name || !name.trim()) return res.status(400).json({ error: "name is required" });
        
        const created = await prisma.user.create({
            data: {
                clerkId: clerkId || userId,
                email: email.trim().toLowerCase(),
                name: name.trim(),
            },
        });
        res.status(201).json(created);
    } catch (e: any) {
        if (e?.code === "P2002") return res.status(409).json({ error: "email or clerkId already exists"});
        console.error('Error creating user:', e);
        res.status(500).json({ error: "failed to create user" });
    }
});
