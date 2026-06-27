/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory fallback if MongoDB is not configured or fails to connect
  let inMemoryInquiries: any[] = [];
  let isMongoConnected = false;

  // Connection helper
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === "") {
    console.log("⚠️ MONGODB_URI is empty/blank in environment variables. Running with secure in-memory storage fallback.");
  } else {
    console.log("🔌 Attempting to connect to MongoDB...");
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 4000,
      });
      isMongoConnected = true;
      console.log("🔌 Connected to MongoDB successfully!");
    } catch (err: any) {
      console.error("❌ Failed to connect to MongoDB. Running with secure in-memory storage fallback.", err.message);
    }
  }

  // Schema definition
  const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    service: { type: String, required: true },
    tonnage: { type: String, default: "" },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

  // API Route: Post new inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { name, email, phone, company, service, tonnage, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required fields." });
      }

      const payload = {
        name,
        email,
        phone: phone || "",
        company: company || "",
        service: service || "General Steel Design",
        tonnage: tonnage || "",
        message,
        createdAt: new Date(),
      };

      if (isMongoConnected) {
        const newInquiry = new Inquiry(payload);
        await newInquiry.save();
        return res.status(201).json({
          success: true,
          message: "Your inquiry has been saved securely to MongoDB!",
          data: newInquiry,
          savedInMongo: true,
        });
      } else {
        inMemoryInquiries.push(payload);
        return res.status(201).json({
          success: true,
          message: "Saved to local server memory fallback (MongoDB configuration is currently pending API key/URI setting).",
          data: payload,
          savedInMongo: false,
        });
      }
    } catch (err: any) {
      console.error("Inquiry submission API error:", err);
      return res.status(500).json({ error: "Server processing error: " + err.message });
    }
  });

  // API Route: Get inquiries history
  app.get("/api/inquiries", async (req, res) => {
    try {
      if (isMongoConnected) {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        return res.json({ inquiries, source: "mongodb" });
      } else {
        return res.json({ inquiries: inMemoryInquiries, source: "memory" });
      }
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to load inquiries: " + err.message });
    }
  });

  // API Route: Check database connection status
  app.get("/api/db-status", (req, res) => {
    res.json({
      connected: isMongoConnected,
      configured: !!(uri && uri.trim() !== ""),
      fallbackToMemory: !isMongoConnected,
    });
  });

  // Vite middleware setup for Development or Static assets routing for Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
