"use client";

/**
 * @file components/sections/ContactForm.tsx
 * @description Highly engineered contact portal with integrated verification.
 */

import { useState, useActionState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact, ContactState } from "@/app/actions/contact";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../motion/variants";

const initialState: ContactState = {};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContact, initialState);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    // Cloudflare Site Key: Uses production key or a standard testing key for localhost development
    const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {state.success ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-10 rounded-[2.5rem] border border-green-500/20 text-center"
                    >
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="text-green-500" size={40} />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Transmission Successful</h3>
                        <p className="text-foreground/50 leading-relaxed italic">
                            Your message has been securely delivered to my digital uplink. I will respond shortly.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        action={formAction}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex flex-col gap-6"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                    disabled={isPending}
                                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                                />
                                {state.fieldErrors?.name && (
                                    <span className="text-red-400 text-[10px] uppercase font-bold px-2">{state.fieldErrors.name[0]}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Digital Address (Email)"
                                    required
                                    disabled={isPending}
                                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-primary/50 focus:bg-white/[0.08] transition-all text-sm"
                                />
                                {state.fieldErrors?.email && (
                                    <span className="text-red-400 text-[10px] uppercase font-bold px-2">{state.fieldErrors.email[0]}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <textarea
                                name="message"
                                placeholder="The Vision / Message"
                                rows={5}
                                required
                                disabled={isPending}
                                className="bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-accent-primary/50 focus:bg-white/[0.08] transition-all text-sm resize-none"
                            />
                            {state.fieldErrors?.message && (
                                <span className="text-red-400 text-[10px] uppercase font-bold px-2">{state.fieldErrors.message[0]}</span>
                            )}
                        </div>

                        {/* Verification Block */}
                        <div className="flex flex-col gap-4 min-h-[65px]">
                            <div className="scale-95 origin-left">
                                <Turnstile
                                    siteKey={SITE_KEY}
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onError={() => console.error("Turnstile failed to load")}
                                    options={{
                                        theme: "dark",
                                    }}
                                />
                            </div>
                            <input type="hidden" name="turnstileToken" value={turnstileToken || ""} />
                            {state.error && !state.fieldErrors && (
                                <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase p-4 glass border border-red-500/20 rounded-2xl">
                                    <AlertCircle size={14} />
                                    {state.error}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending || !turnstileToken}
                            className="group flex items-center justify-center gap-4 py-5 rounded-3xl bg-accent-primary text-white font-black uppercase tracking-widest text-xs hover:bg-accent-primary/90 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed transition-all shadow-xl shadow-accent-primary/10"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Transmitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    <span>{turnstileToken ? "Send Transmission" : "Verification Required"}</span>
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
