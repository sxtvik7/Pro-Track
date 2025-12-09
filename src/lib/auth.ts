"use server";

import { cookies } from "next/headers";
import { supabaseServer } from "./supabase";
import { db } from "@/db/db";
import { trainers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentTrainer(){
    const cookieStore = cookies();
    const access_token  = (await cookieStore).get('sb-access-token')?.value;

    if(!access_token) return null;

    const supabase = supabaseServer();
    const {data: {user}} = await supabase.auth.getUser(access_token);

    if(!user) return null;

    const trainer = await db.query.trainers.findFirst({
        where: eq(trainers.auth_user_id, user.id),
    });

    if(!trainer) return null;
    return trainer;
}