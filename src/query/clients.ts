// By default, the browser's fetch() method has a credentials policy of "same-origin"
// include helps even for cross-origin requests

/*
    useQuery → for GET requests
    useMutation → for POST/PUT/DELETE (not shown here)
    useQueryClient → to update cache (not used here)
*/

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const API_BASE = `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/clients`

interface Client {
    id: string; 
    name: string;
    email: string | null;
    phone: string | null;
    dob: Date | null; 
    sex: string | null;
    address: string | null;
}

// Fetch all Clients
export function useClient() {
    return useQuery({
        queryKey: ["clients"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE}`, {credentials: "include"});
            if(!res.ok) throw new Error("failed to fetch the clients")
            const json = await res.json();
            return json.clients as Client[];
        },
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5,
    })
}

// Create a Clinet
type CreateClinetInput = Omit<Client, 'id' | 'dob'> & {dob: string | null}

export function useCreateClient(){
    const qc = useQueryClient();
    return useMutation<Client, Error, CreateClinetInput>({
        mutationFn: async (payload) => {
            const res = await fetch(`${API_BASE}`, {
                method: 'POST',
                credentials: "include",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(payload),
            });
            if(!res.ok) throw new Error("Create Failed");
            const json = await res.json();
            return json.client as Client
        },
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["clients"]});
        }
    });
}

// Update Client
type UpdateClinetInput = Partial<Client> & {id: string};

export function useUpdateClient(){
    const qc = useQueryClient()
    return useMutation<Client, Error, UpdateClinetInput>({
        mutationFn: async ({id, ...payload}) => {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            })
            if(!res.ok) throw new Error("Update failed")
            const json = await res.json();
            return json.client as Client;
        },
        
        onSuccess: (_, variables) => {
            qc.invalidateQueries({ queryKey: ["clients"] });
            qc.invalidateQueries({queryKey: ["client", variables.id]})
        }
    })
}

// Delete Client

interface DeleteResponse {
    success: boolean,
    id: string;
}

export function useDeleteClient() {
    const qc = useQueryClient();
    return useMutation<DeleteResponse, Error, string> ({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
                credentials: "include",     
            });
            if(!res.ok) throw new Error("Delete failed");
            return res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["clients"] });
        }
    })
}