"use server";

import { getCurrentTrainer } from "./auth";

export async function requireTrainer() {
  const trainer = await getCurrentTrainer();
  if (!trainer) throw new Error("Unauthorized");
  return trainer;
}

/**
  IMPORTANT:
  Middleware only protects page access, NOT server actions.
 
  Even if middleware lets someone load a page,
  a hacker can still call your server actions directly
  (via Postman, curl, scripts, or extensions)
  WITHOUT ever visiting the page.
 
  Middleware will NOT run in those cases.
  So every sensitive action MUST call `requireTrainer()`
  to verify the user is an authenticated trainer before running.
 */
