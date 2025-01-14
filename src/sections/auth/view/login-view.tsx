'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { login } from '@/apis/auth';
import { useAuth } from '@/context/auth-context';
import { loginSchema } from '../data';

import { Button } from '@/components/button';
import { LogoSVG, GoogleSVG } from '@/components/icons';
import { DebounceInput } from '@/components/input';
import { Typography } from '@/components/typography';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/alert-dialog';

import styled from '@/styles/auth.module.css';

export default function LoginView() {
    const { setToken } = useAuth();
    const router = useRouter();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setUsernameError('');
        setPasswordError('');

        const result = loginSchema.safeParse({ username, password });
        if (!result.success){
            result.error.errors.forEach((error) => {
                if (error.path.includes('username')) {
                    setUsernameError(error.message);
                } else if (error.path.includes('password')) {
                    setPasswordError(error.message);
                }
            });
            setLoading(false);
            return;
        }

        try {
            const token = await login({ username, password });

            if (token && token.data){
                setToken(token.data);
                router.push('/');
            }
        } catch (err: any){
            if (err.response && err.response.data && err.response.data.message){
                setPasswordError(err.response.data.message);
            } else {
                setPasswordError('Đã có lỗi xảy ra, vui lòng thử lại sau');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
          <div className="bg-auth w-full h-svh flex justify-center items-center">
            <div id="stars" className={styled.stars}></div>
            <div className="w-full p-[2.5rem] relative mx-auto md:max-w-[26.5rem] md:before:content-[''] md:before:absolute md:before:inset-0 md:before:rounded-button md:before:pointer-events-none md:before:border-[0.75rem] md:before:border-[#f7f7f780] md:before:opacity-[0.29] md:before:blur-[20px] md:before:bg-auth-form md:after:bg-[#363638] md:after:shadow-auth-card md:after:backdrop:blur-[50px] md:after:content-[''] md:after:absolute md:after:inset-0 md:after:rounded-button md:after:pointer-events-none">
              <div className="relative z-[2]">
                <div className="flex flex-col mb-[2.5rem] items-center gap-6">
                  <LogoSVG className="object-contain w-[150px]" />
    
                  <Typography level="h4" className="text-primary">
                  Đăng nhập Baso Spark
                  </Typography>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                    <DebounceInput
                      type="text"
                      name="username"
                      placeholder="Tên đăng nhập"
                      value={username}
                      className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                      onChange={(value: string) => setUsername(value)}
                    />
                    {usernameError && (
                      <Typography level="captionr" className="text-red-500">
                        {usernameError}
                      </Typography>
                    )}
                    <DebounceInput
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={password}
                      debounce={0}
                      className="w-full bg-neutral2-5 placeholder:text-tertiary base text-primary text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent focus:border-neutral2-10"
                      onChange={(value: string) => setPassword(value)}
                    />
                    {passwordError && (
                      <Typography level="captionr" className="text-red-500">
                        {passwordError}
                      </Typography>
                    )}
                  </div>
    
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className={`w-full base px-[2rem] py-[0.875rem] ${loading ? 'bg-neutral2-5 opacity-50' : 'opacity-100'}`}
                      disabled={loading}
                      child={
                        <Typography level="base2sm" className="text-tertiary">
                          {loading ? 'Đang tải...' : 'Đăng Nhập'}
                        </Typography>
                      }
                    />
    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          className="w-full px-[2rem] py-[0.875rem]"
                          child={
                            <div className="flex items-center gap-3 justify-center">
                              <GoogleSVG className="w-5 h-5" />
                              <Typography
                                level="base2sm"
                                className="text-secondary"
                              >
                                Đăng nhập bằng Google
                              </Typography>
                            </div>
                          }
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle><LogoSVG className="w-[30px]"/>Baso Spark</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          Hiện tại tính năng này chưa được hỗ trợ
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Đóng</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
    
                    <Typography
                      level="captionr"
                      className="opacity-80 flex items-center gap-2 text-secondary justify-center"
                    >
                      Bạn chưa có tài khoản?
                      <a href="/register" className="opacity-100 font-semibold">
                        <Typography level="captionsm" className="opacity-100">
                            Đăng ký miễn phí!
                        </Typography>
                      </a>
                    </Typography>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
}