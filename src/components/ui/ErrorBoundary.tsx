"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * @class ErrorBoundary
 * @description Provides circuit-breaker functionality for the UI tree.
 * Implements Reliability by preventing a single component failure from crashing the entire app.
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
                        <div className="glass p-12 rounded-[2rem] border border-white/10 text-center max-w-md">
                            <h2 className="text-3xl font-bold mb-4">Architecture Anomaly</h2>
                            <p className="text-foreground/40 mb-8 italic">
                                A non-critical fault was detected in the UI stream. The system has stabilized.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-4 rounded-2xl bg-accent-primary text-white font-bold hover:scale-105 transition-transform"
                            >
                                Re-initialize Systems
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
