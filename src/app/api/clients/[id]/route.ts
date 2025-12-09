import { softDeleteClient } from "@/actions/clients/delete-client";
import { getClientById } from "@/actions/clients/get-client";
import { updateClinet } from "@/actions/clients/update-client";
import { NextResponse } from "next/server";

interface Params {params : {id : string}}

export async function GET(_req: Request, { params }: Params) {
    const id = params.id
    const client = await getClientById(id);
    if(!client) return NextResponse.json({ client: null}, {status: 404});
    return NextResponse.json({ client });
}

export async function PUT(req: Request, {params} : Params) {
    const id = params.id;
    const body = await req.json();
    body.id = id;
    const client = await updateClinet(body);
    return NextResponse.json({ client });
}

export async function DELETE(_req: Request, { params }: Params){
    const id = Number(params.id);
    const res = await softDeleteClient({ id });
    return NextResponse.json(res)
}