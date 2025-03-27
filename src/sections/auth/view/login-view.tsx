'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { googleLogin, login } from '@/apis/auth';
import { useAuth } from '@/context/auth-context';
import { loginSchema } from '../data';

import { Button } from '@/components/button';
import { LogoSVG, GoogleSVG } from '@/components/icons';
import { DebouncedInput } from '@/components/input';
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
import { ToggleLanguage } from '@/components/toggleLanguage';
import { ToggleTheme } from '@/components/toggleTheme';

import styled from '@/styles/auth.module.css';
import '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { cn } from '@/lib';
import { signIn, useSession } from 'next-auth/react';
import { F2A } from '@/components/f2a';

export default function LoginView() {
    const { setToken } = useAuth();
    const router = useRouter();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isF2A, setIsF2A] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data: session} = useSession();

    React.useEffect(() => {
        const loginGoogle = async () => {
        if (session) {
            console.log(session);
            setLoading(true);
            const avatar = session.user?.image ?? '';  // Sử dụng null nếu avatar là undefined
            const firstName = session.user?.firstName ?? '';  // Sử dụng null nếu firstName là undefined
            const lastName = session.user?.lastName ?? '';  // Sử dụng null nếu lastName là undefined
            const username = session.user?.username ?? '';  // Sử dụng null nếu username là undefined
            const email = session.user?.email ?? '';  // Sử dụng null nếu email là undefined
            const password = "000000";  // Hoặc mật khẩu mặc định
            try {
                const token = await googleLogin({
                  avatar,
                  firstName,
                  lastName,
                  username,
                  email,
                  password,
                });

                if (token) {
                  if (token.f2a) {
                    setIsF2A(true);
                    setUserId(token.token);
                  } else {
                    setToken(token.token);
                    router.push('/');
                  }
                }
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                    setPasswordError(err.response.data.message);
                } else {
                    setPasswordError('Đã có lỗi xảy ra, vui lòng thử lại sau');
                }
            } finally {
                setLoading(false);
            }
        }}
        loginGoogle();
    }, [session]);
    

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
            const data = await login({ username, password });
            console.log(data);

            if (data && data.f2a) {
                setIsF2A(true);
                setUserId(data.token)
            } else {
                setToken(data.token);
                router.push('/');
            }

            // if (token && token.data){
            //     setToken(token.data);
            //     router.push('/');
            // }
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
          <div className="bg-auth-light bg-[#c1c1c1] w-full h-svh flex justify-center items-center dark:bg-auth">
            <div className='flex gap-4 absolute top-0 right-0 p-[1rem]'>
              <ToggleLanguage />
              <ToggleTheme />
            </div>
            <div id="stars" className={cn(styled.stars, theme === 'dark' ? styled.dark : styled.light)}></div>
            <div className="w-full p-[2.5rem] relative mx-auto md:max-w-[26.5rem] md:before:content-[''] md:before:absolute md:before:inset-0 md:before:rounded-button md:before:pointer-events-none md:before:border-[0.75rem] dark:md:before:border-[#f7f7f780] md:before:border-[#000000] md:before:opacity-[0.29] md:before:blur-[20px] md:before:bg-auth-form dark:md:after:bg-[#363638] md:after:bg-[#dfdfdf] dark:md:after:shadow-auth-card-dark md:after:shadow-auth-card md:after:backdrop:blur-[50px] md:after:content-[''] md:after:absolute md:after:inset-0 md:after:rounded-button md:after:pointer-events-none">
              <div className="relative z-[2]">
                <div className="flex flex-col mb-[2.5rem] items-center gap-6">
                  <LogoSVG className="object-contain w-[150px]" />
    
                  <Typography level="h4" className="dark:text-primary text-surface-2">
                    {t('Login to Baso Spark')}
                  </Typography>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                    <DebouncedInput
                      type="text"
                      name="username"
                      placeholder={t('username')}
                      value={username}
                      className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                      onChange={(value: string) => setUsername(value)}
                    />
                    {usernameError && (
                      <Typography level="captionr" className="text-red-500">
                        {usernameError}
                      </Typography>
                    )}
                    <DebouncedInput
                      type="password"
                      name="password"
                      placeholder={t('password')}
                      value={password}
                      debounce={0}
                      className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
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
                      className={`w-full base px-[2rem] py-[0.875rem] ${loading ? 'bg-neutral2-5  opacity-50' : 'opacity-100'}`}
                      disabled={loading}
                      child={
                        <Typography level="base2sm" className="dark:text-tertiary text-surface-2">
                          {loading ? t('loading'): t('login')}
                        </Typography>
                      }
                    />
                    <Button
                        className="w-full px-[2rem] py-[0.875rem]"
                        disabled={loading}
                        child={
                            <div className="flex items-center gap-3 justify-center">
                                <GoogleSVG className="w-5 h-5"/>
                                <Typography level="base2sm" className="dark:text-secondary text-surface-2">
                                    {t('sign in with google')}
                                </Typography>
                            </div>
                        }
                        onClick={() => signIn("google")}
                    />
                    <Typography
                      level="captionr"
                      className="opacity-80 flex items-center gap-2 dark:text-secondary text-surface-2 justify-center"
                    >
                      {t('noaccount')}
                      <a href="/register" className="opacity-100 font-semibold">
                        <Typography level="captionsm" className="opacity-100">
                            {t('registerfree')}
                        </Typography>
                      </a>
                    </Typography>
                  </div>
                </form>
              </div>
            </div>
          </div>
          { isF2A && (
            <F2A id={userId} />
          )}
        </>
      );
}