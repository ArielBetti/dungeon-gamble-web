import { z } from 'zod';

export const LoginSchema = z.object({
  login: z.string().min(3, {
    message: 'Login é obrigatório',
  }),
  password: z.string().min(6, {
    message: 'Digite uma senha com no mínimo 6 caracteres',
  }),
});
