import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(1, 'El nombre es obligatorio'),
	brand: z.string().min(1, 'La marca es obligatoria'),
	model: z.string().min(1, 'El modelo es obligatorio'),
	description: z.string().min(1, 'La descripción es obligatoria'),
	category: z.string().min(1, 'La categoría es obligatoria'),
	stock: z.number().int().positive('El stock no puede ser negativo'),
	productCode: z.number().int().positive('El código de producto debe ser un número positivo'),
	status: z.enum(["ENTREGADO", "ENTREGADO_MANANA", "PENDIENTE", "ENTREGAR_DIA", "NO_ENTREGADO"]).optional().default("PENDIENTE"),
	branchId: z.number().int().positive('El id de la sucursal no puede ser negativo'),
})