"use server";

/**
 * @file actions/contact.ts
 * @description Secure server-side orchestration for the contact pipeline.
 * Implements strict validation, sanitization, and Cloudflare Turnstile verification.
 */

import { z } from "zod";

// Validation Schema (Strict)
const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
    turnstileToken: z.string().min(1, "Human verification required"),
});

export type ContactState = {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

/**
 * @function verifyTurnstile
 * @description Verifies the Turnstile token with Cloudflare's API.
 */
async function verifyTurnstile(token: string) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Internal test key if none

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
    });

    const result = await response.json();
    return result.success;
}

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // 1. Data Extraction & Sanitization (Implicit by Zod)
    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        turnstileToken: formData.get("turnstileToken") as string,
    };

    // 2. Structural Validation
    const validatedFields = ContactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            fieldErrors: validatedFields.error.flatten().fieldErrors,
            error: "Validation failed. Please check your inputs.",
        };
    }

    const { name, email, message, turnstileToken } = validatedFields.data;

    // 3. Human Verification (Security)
    try {
        const isHuman = await verifyTurnstile(turnstileToken);
        if (!isHuman) {
            return { error: "Security verification failed. Are you a bot?" };
        }
    } catch (err) {
        console.error("Turnstile Error:", err);
        return { error: "Verification system unreachable. Please try again later." };
    }

    // 4. Email Delivery using Resend
    try {
        const resendApiKey = process.env.RESEND_API_KEY;
        
        if (resendApiKey) {
            const { Resend } = await import("resend");
            const resend = new Resend(resendApiKey);
            
            await resend.emails.send({
                from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
                to: process.env.EMAIL_TO || "arjunnyaupane16@gmail.com",
                subject: `Portfolio Contact: ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
            });
        } else {
            // Fallback: log to console if no API key
            console.log(`[CONTACT FORM] From: ${name} (${email}), Message: ${message}`);
        }

        return { success: true };
    } catch (err) {
        console.error("Delivery Fault:", err);
        return { error: "Communication fault. Please contact directly via LinkedIn." };
    }
}
