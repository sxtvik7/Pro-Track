import {z} from "zod";

export const clientCreateSchema = z.object({
    name: z.string().min(1, "Name is required").max(200),
    email: z.string().email().optional().nullable(),
    phone: z.string().max(50).optional().nullable(),
    dob: z.string().optional().nullable(),
    sex: z.enum(['male', 'female']).optional().nullable(),
    address: z.string().max(2000).optional().nullable(),
});


export const clinetUpdateSchema = clientCreateSchema.extend({
    id: z.string().uuid(),
})

export type ClientCreateInput = z.infer<typeof clientCreateSchema>;
export type ClientUpdateInput = z.infer<typeof clinetUpdateSchema>;