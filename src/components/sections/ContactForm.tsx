"use client";

import { useState, useActionState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact, ContactState } from "@/app/actions/contact";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialState: ContactState = {};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContact, initialState);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state.success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-16 text-center"
                    >
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: "rgba(184,255,53,0.12)", border: "1px solid var(--accent)" }}
                        >
                            <CheckCircle2 size={32} style={{ color: "var(--accent)" }} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                        <p className="text-sm" style={{ color: "var(--muted)" }}>
                            I&apos;ll get back to you within 24 hours.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        action={formAction}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-0"
                    >
                        {/* Name */}
                        <div className="flex flex-col gap-1" style={{ borderBottom: "1px solid var(--border)" }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                disabled={isPending}
                                className="form-field"
                            />
                            {state.fieldErrors?.name && (
                                <span className="text-xs pb-1" style={{ color: "#ff4444", fontFamily: "var(--font-mono)" }}>
                                    {state.fieldErrors.name[0]}
                                </span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1" style={{ borderBottom: "1px solid var(--border)" }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                disabled={isPending}
                                className="form-field"
                            />
                            {state.fieldErrors?.email && (
                                <span className="text-xs pb-1" style={{ color: "#ff4444", fontFamily: "var(--font-mono)" }}>
                                    {state.fieldErrors.email[0]}
                                </span>
                            )}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1" style={{ borderBottom: "1px solid var(--border)", marginBottom: "2rem" }}>
                            <textarea
                                name="message"
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                                disabled={isPending}
                                className="form-field"
                                style={{ resize: "none" }}
                            />
                            {state.fieldErrors?.message && (
                                <span className="text-xs pb-1" style={{ color: "#ff4444", fontFamily: "var(--font-mono)" }}>
                                    {state.fieldErrors.message[0]}
                                </span>
                            )}
                        </div>

                        {/* Turnstile */}
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="scale-95 origin-left">
                                <Turnstile
                                    siteKey={SITE_KEY}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onError={() => console.error("Turnstile failed")}
                                    options={{ theme: "dark" }}
                                />
                            </div>
                            <input type="hidden" name="turnstileToken" value={turnstileToken || ""} />
                            {state.error && !state.fieldErrors && (
                                <div className="flex items-center gap-2 text-xs p-3 rounded-lg"
                                    style={{ background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.2)", color: "#ff4444", fontFamily: "var(--font-mono)" }}>
                                    <AlertCircle size={13} />
                                    {state.error}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending || !turnstileToken}
                            className="flex items-center justify-center gap-3 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all group"
                            style={{
                                background: (isPending || !turnstileToken) ? "rgba(184,255,53,0.3)" : "var(--accent)",
                                color: "#0a0a0a",
                                fontFamily: "var(--font-mono)",
                                cursor: (isPending || !turnstileToken) ? "not-allowed" : "none",
                            }}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" size={15} />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    <span>{turnstileToken ? "Send Message" : "Complete Verification"}</span>
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
