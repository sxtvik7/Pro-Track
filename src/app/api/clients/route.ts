import { createClient } from "@/actions/clients/create-client";
import { getClients } from "@/actions/clients/get-clients";
import { NextResponse } from "next/server";

export async function GET(){
    const clients = await getClients();
    return NextResponse.json({ clients })
}

export async function POST(req: Request) {
    const body = await req.json();
    const client = await createClient({body})
    return NextResponse.json({client})
}