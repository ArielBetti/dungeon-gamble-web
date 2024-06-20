import { z } from 'zod';

export const RegisterSchema = z.object({
  login: z.string().min(3, {
    message: 'Escolha um login de pelo menos 3 caracteres',
  }),
  email: z.string().email({
    message: 'Digite um email válido',
  }),
  password: z.string().min(6, {
    message: 'Digite uma senha com no mínimo 6 caracteres',
  }),
  name: z.string().min(3, {
    message: 'Escolha um apelido de pelo menos 3 caracteres',
  }),
  tag: z
    .string()
    .min(3, {
      message: 'A Tag precisa de pelo menos 3 caracteres',
    })
    .max(5, 'A tag não pode ter mais de 5 caracteres'),
});
