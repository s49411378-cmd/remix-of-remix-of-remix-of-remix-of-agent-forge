import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { HackerBackground } from "./HackerBackground";
const SplashCursor = lazy(() => import("./SplashCursor.jsx"));

export function UserBackground() {
  return <div className="user-effects" aria-hidden="true">
    <HackerBackground />
    <ClientOnly fallback={null}><Suspense fallback={null}><SplashCursor quality="low" intro={false} intensity={0.65} trail={0.6} /></Suspense></ClientOnly>
  </div>;
}