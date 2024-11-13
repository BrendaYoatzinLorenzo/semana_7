import { z } from "zod";

export const freightSchema = z.object({
	city: z.string().min(1, 'El nombre es obligatorio'),
	price: z.number().min(1, 'El precio es obligator'),
});