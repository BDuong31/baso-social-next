import { z } from 'zod';

// ----------------------------------------------------------------------

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Tên đăng nhập là bắt buộc' })
    .max(30, { message: 'Tên đăng nhập phải có 30 ký tự trở xuống' }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải dài ít nhất 6 ký tự' })
    .max(30, { message: 'Mật khẩu phải có 30 ký tự trở xuống' }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Họ và tên đệm phải dài ít nhất 2 ký tự' })
    .max(30, { message: 'Họ và tên đệm phải có 30 ký tự trở xuống' }),
  lastName: z
    .string()
    .min(2, { message: 'Tên phải dài ít nhất 2 ký tự' })
    .max(30, { message: 'Tên phải có 30 ký tự trở xuống' }),
  username: z
    .string()
    .min(1, { message: 'Tên đăng nhập là bắt buộc' })
    .max(30, { message: 'Tên đăng nhập phải có 30 ký tự trở xuống' }),
  password: z
    .string()
    .min(6, { message: 'Mật khẩu phải dài ít nhất 6 ký tự' })
    .max(30, { message: 'Mật khẩu phải có 30 ký tự trở xuống' }),
});

export type RegisterData = z.infer<typeof registerSchema>;
