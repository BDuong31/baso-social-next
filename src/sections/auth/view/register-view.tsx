'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

import { googleLogin, register } from '@/apis/auth';
import { registerSchema } from '../data';

import { Button } from '@/components/button';
import { GoogleSVG, LogoSVG } from '@/components/icons';
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
import { signIn, signOut, useSession } from "next-auth/react";
import { useAuth } from '@/context/auth-context';

export default function RegisterView() {
    const router = useRouter();
    const { setToken } = useAuth();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmError, setConfirmError] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { data: session } = useSession();

    console.log(session);
    React.useEffect(() => {
        const loginGoogle = async () => {
        if (session) {
            console.log(session);
            setLoading(true);
            const avatar = session.user?.image;
            const firstName = session.user?.lastName;
            const lastName = session.user?.firstName;
            const username = session.user?.username;
            const email = session.user?.email;
            const password = "000000";

            try {
                const token = await googleLogin({
                    avatar,
                    firstName,
                    lastName,
                    username,
                    email,
                    password
                });

                if (token && token.data) {
                    setToken(token.data);
                    router.push('/');
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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFirstNameError('');
        setLastNameError('');
        setUsernameError('');
        setPasswordError('');

        const result = registerSchema.safeParse({ firstName, lastName, username, email, phone, password });
        if (!result.success) {
            result.error.errors.forEach((error) => {
                if (error.path.includes('firstName')) {
                    setFirstNameError(error.message);
                } else if (error.path.includes('lastName')) {
                    setLastNameError(error.message);
                } else if (error.path.includes('username')) {
                    setUsernameError(error.message);
                } else if (error.path.includes('password')) {
                    setPasswordError(error.message);
                }
            });
            setConfirmError(true);
            setLoading(false);
            return;
        }

        try {
            const userData = await register({ 
                firstName, 
                lastName, 
                username,
                email,
                password 
            });

            if (userData) {
                router.push('/login');
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
    };
    return (
        <>
        <head>
            <title>{t('title register')}</title>
        </head>
        <div className="bg-auth-light bg-[#c1c1c1] dark:bg-auth w-full h-svh flex flex-col justify-around items-center px-[2.5rem]">
            <div className='flex gap-4 absolute top-0 right-0 p-[1rem]'>
              <ToggleLanguage />
              <ToggleTheme />
            </div>
            <div id="stars" className={cn(styled.stars, theme === 'dark' ? styled.dark : styled.light)}></div>
            <div className="w-full p-[2.5rem] relative mx-auto md:max-w-[26.5rem] md:before:content-[''] md:before:absolute md:before:inset-0 md:before:rounded-button md:before:pointer-events-none md:before:border-[0.75rem] dark:md:before:border-[#f7f7f780] md:before:border-[#000000] md:before:opacity-[0.29] md:before:blur-[20px] md:before:bg-auth-form dark:md:after:bg-[#363638] md:after:bg-[#dfdfdf] dark:md:after:shadow-auth-card-dark md:after:shadow-auth-card md:after:backdrop:blur-[50px] md:after:content-[''] md:after:absolute md:after:inset-0 md:after:rounded-button md:after:pointer-events-none">
                <div className="relative z-[2]">
                    <div className="flex flex-col mb-[2.5rem] items-center gap-6">
                        <LogoSVG className="object-contain w-[150px]"/>
                        <Typography level="h4" className="dark:text-primary text-surface-2">
                            {t('Register to Baso Spark')}
                        </Typography>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-[0.875rem] mb-[1.5rem]">
                            <DebouncedInput
                                type="text"
                                name="firstName"
                                placeholder={t('first name')}
                                className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                                value={firstName}
                                onChange={(value: string) => setFirstName(value)}
                            />
                            {firstNameError && !confirmError && (
                                <Typography level="captionr" className="text-red-500">
                                    {firstNameError}
                                </Typography>
                            )}
                            <DebouncedInput
                                type="text"
                                name="lastName"
                                placeholder={t('last name')}
                                className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                                value={lastName}
                                onChange={(value: string) => setLastName(value)}
                            />
                            {lastNameError && !confirmError && (
                                <Typography level="captionr" className="text-red-500">
                                    {lastNameError}
                                </Typography>
                            )}
                            <DebouncedInput
                                 type="text"
                                 name="username"
                                 placeholder={t('username')}
                                 className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                                 value={username}
                                 onChange={(value: string) => setUsername(value)}
                            />
                            {usernameError && !confirmError && (
                                <Typography level="captionr" className="text-red-500">
                                    {usernameError}
                                </Typography>
                            )}
                            <DebouncedInput
                                 type="text"
                                 name="email"
                                 placeholder={t('email')}
                                 className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                                 value={email}
                                 onChange={(value: string) => setEmail(value)}
                            />
                            {usernameError && !confirmError && (
                                <Typography level="captionr" className="text-red-500">
                                    {usernameError}
                                </Typography>
                            )}
                            <DebouncedInput
                                 type="password"
                                 name="password"
                                 placeholder={t('password')}
                                 className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                                 value={password}
                                 onChange={(value: string) => setPassword(value)}
                            />
                            {passwordError && !confirmError && (
                                <Typography level="captionr" className="text-red-500">
                                    {passwordError}
                                </Typography>
                            )}
                        </div>
                        <div  className="flex flex-col gap-3">
                            <Button
                                className="w-full base px-[2rem] py-[0.875rem]"
                                disabled={loading}
                                child={
                                    <Typography level="base2sm" className="dark:text-tertiary text-surface-2">
                                        {loading ? t('loading') : t('sign up')}
                                    </Typography>
                                }
                                onClick={() => handleRegister}
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
                            {/* <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        type="button"
                                        className="w-full px-[2rem] py-[0.875rem]"
                                        child={
                                            <div className="flex items-center gap-3 justify-center">
                                                <GoogleSVG className="w-5 h-5"/>
                                                <Typography level="base2sm" className="dark:text-secondary text-surface-2">
                                                    {t('sign in with google')}
                                                </Typography>
                                            </div>
                                        }
                                    />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle><LogoSVG className="w-[30px] h-[30px]"/>Baso Spark</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogDescription>
                                        {t('nosupport')}
                                    </AlertDialogDescription>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>{t('close')}</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog> */}

                            <Typography
                                level="captionr"
                                className="opacity-80 flex items-center gap-2 dark:text-secondary text-surface-2 justify-center"
                                >
                                {t('haveaccount')}
                                <a href="/login" className="opacity-100 font-semibold">
                                <Typography level="captionsm" className="opacity-100">
                                    {t('loginfree')}
                                </Typography>
                                </a>
                            </Typography>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}