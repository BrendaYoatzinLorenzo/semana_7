import { z } from "zod";

export const branchtSchema = z.object({
	name: z.string().min(1, 'El nombre es obligatorio'),
	adress: z.number().min(1, 'El nombre es obligator'),
});