"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCodeStyling from "qr-code-styling";

import { useUserProfile } from "@/context/user-context";
import { IUserProfile } from "@/interfaces/user";
import AvatarProfile from "@/components/avatar/avatar-profile";
import { Button } from "@/components/button";
import { CheckIcon, ShareIcon, LinkIcon, ProfileIcon, CommentIcon, CloseIcon, Logo } from "@/components/icons";
import { SplashScreen } from "@/components/loading-screen";
import { Typography } from "@/components/typography";
import { USER_AVATAR_PLACEHOLDER } from "@/constant";
import { followUser, hasFollowed, unfollowUser } from "@/apis/user";
import { useTranslation } from "react-i18next";
import { BackgroundPattern } from "@/components/pattern";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/alert-dialog';
  import domtoimage from "dom-to-image";
import Emoji from "./emoji";
  interface UserInfoProps {
    user: IUserProfile;
}

export default function InfoUser({ user }: UserInfoProps) {
    const { userProfile, loading } = useUserProfile();
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isShare, setIsShare] = useState<boolean>(false);
    const { t } = useTranslation();
    const qrRef = useRef<HTMLDivElement>(null);
    const qrContainer = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("😎");
    const [ color, setColor ] = useState<string>("#ffffff");

    useEffect(() => {
        (async () => {
            setIsFollowed(await hasFollowed(user.id));
        })();
    }, [user]);

    useEffect(() => {
        if (!isShare) return;
    
        setTimeout(() => {
            if (!user || !qrRef.current) {
                console.log("User hoặc qrRef chưa có dữ liệu, dừng QR Code.");
                return;
            }
    
            // Hàm chuyển SVG thành base64
            const getBase64Logo = (color: string | undefined) => {
                // Chúng ta tạo chuỗi SVG trực tiếp
                const svgString = `<?xml version="1.0" encoding="UTF-8"?>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.443 499.333">
                        <defs>
                            <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#feda75" />
                                <stop offset="25%" stop-color="#fa7e1e" />
                                <stop offset="50%" stop-color="#d62976" />
                                <stop offset="75%" stop-color="#962fbf" />
                                <stop offset="100%" stop-color="#4f5bd5" />
                            </linearGradient>
                        </defs>
                        <path fill="${color ? color : 'url(#instagramGradient)'}" d="M 272.095 111.166 L 272.42 0.334 L 112.261 131.551 L 80.373 131.058 L 223.407 241.449 L 213.568 241.162 L 95.432 335.325 L 94.766 176.69 L 77.256 192.23 L 76.499 354.042 L 100.833 353.948 L 223.577 257.178 C 223.577 257.178 333.253 258.622 335.167 258.483 C 337.081 258.346 244.665 333.077 244.665 333.077 L 327.685 399.648 L 270.493 445.168 C 270.493 445.168 48.988 445.797 49.089 445.797 C 49.19 445.797 277.102 262.42 277.102 262.42 L 249.919 262.379 C 249.919 262.379 0.747 461.492 0.747 461.396 C 0.747 461.297 250.478 461.029 250.478 461.029 L 202.855 499.945 L 230.668 499.981 L 355.677 399.202 L 272.896 332.726 L 364.105 258.505 L 389.872 258.336 L 370.035 242.466 L 247.245 241.091 L 125.657 146.478 C 125.657 146.478 250.617 43.177 250.617 43.281 C 250.617 43.385 250.406 111.828 250.305 111.828 C 250.205 111.828 271.866 111.838 272.095 111.166 Z"/>
                    </svg>`;
            
                // Mã hóa chuỗi SVG thành base64
                const base64 = btoa(svgString);
                return `data:image/svg+xml;base64,${base64}`;
            };
    
            const profileUrl = `${window.location.origin}/profile/${user.username}`;
            const base64Logo = getBase64Logo(color); // Lấy base64 từ logo SVG
            console.log("Profile URL:", profileUrl);
            console.log("Base64 Logo:", base64Logo); // In ra base64 logo để kiểm tra
    
            const qr = new QRCodeStyling({
                width: 250,
                height: 250,
                type: "canvas",
                data: profileUrl,
                image: base64Logo,  // Sử dụng giá trị của base64Logo
                dotsOptions: { color: color, type: "rounded" },
                cornersDotOptions: { type: "dot" },
                backgroundOptions: { color: "#ffffff" },
                imageOptions: { crossOrigin: "anonymous", margin: 10 }
            });
    
            console.log("QR Object:", qr);
            setQrCode(qr);
    
            qrRef.current.innerHTML = "";
            qr.append(qrRef.current);
    
            console.log("QR Ref Content:", qrRef.current);
        }, 500); // Đợi 500ms để user có dữ liệu
    }, [isShare, user, color]);    

    const handleFollow = () => {
        if (isFollowed) {
            unfollowUser(user.id);
            setIsFollowed(false);
        } else {
            followUser(user.id);
            setIsFollowed(true);
        }
    };

    const handleEmojiSelect = (emoji: any) => {
        setSelectedEmoji(emoji);
    }

    const handleColor = (color: string) => {
        setColor(color);
        console.log(color);
    }

    const handleShare = () => {
        setIsShare(!isShare);
    };

    const handleCopied = async () => {
        const profileUrl = `${window.location.origin}/profile/${user.username}`;
        try {
            await navigator.clipboard.writeText(profileUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };

    const handleDownload = () => {
        if (!qrContainer.current) return;
    
        const scale = 5; // Tăng độ phân giải
    
        domtoimage.toPng(qrContainer.current, {
            quality: 1, // Chất lượng cao nhất

            width: qrContainer.current.offsetWidth * scale,
            height: qrContainer.current.offsetHeight * scale,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                backgroundColor: "#ffffff", // Nền trắng
            },
        })
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `QR_${userProfile?.username}.png`;
            link.click();
        })
        .catch((error) => {
            console.error("Lỗi khi tải ảnh:", error);
        });
    };
    

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <>
            <div className="w-full relative z-[2]">
                <Image
                    width={1200}
                    height={180}
                    src={user.cover || "/img/default-cover.jpg"}
                    className="max-h-[11.25rem] w-full object-cover"
                    alt="cover"
                />
                <AvatarProfile avatar={user.avatar || USER_AVATAR_PLACEHOLDER} canEdit={false} />
            </div>
            <div className="w-full flex flex-col gap[1.25rem] p-6 mt-6 relative z-[2]">
                <div id="profile-info-header" className="flex items-center gap-[0.4375rem]">
                    <div className="grow opacity-80">
                        <Typography level="title" className="dark:text-primary text-surface-3">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography level="base2r" className="dark:text-tertiary text-surface">
                            @{user.username}
                        </Typography>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                child={<ShareIcon width={24} height={24} />}
                                className="p-2.5"
                                onClick={handleShare}
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent >
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                <div className="flex items-center justify-between">
                                    <div className="m-auto text-[28px] dark:text-primary text-surface-3">{t('share profile')}</div>
                                    <AlertDialogCancel className="px-3 py-3 flex " onClick={handleShare}>
                                        <CloseIcon />
                                    </AlertDialogCancel>
                                </div>
                            </AlertDialogTitle>
                                <AlertDialogDescription ref={qrContainer}> 
                                    <div className="relative w-[100%] h-[500px] group">
                                        <BackgroundPattern emoji={selectedEmoji} onColor={handleColor}/>
                                        <div className="absolute bg-white top-[6rem] shadow-lg rounded-lg left-1/2 -translate-x-1/2 group-hover:block">
                                            <div ref={qrRef} className="p-10 pt-6 pb-2"></div>
                                            <Typography level="title" style={{ color }} className="text-center text-[28px] m-4">
                                                @{user?.username}
                                            </Typography>
                                        </div>
                                    </div>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex sm:justify-center items-center gap-2">
                                <Emoji
                                    onEmojiSelect={handleEmojiSelect}
                                />                                 
                                <Button
                                    child={
                                        <Typography level="base2r" className="dark:text-tertiary text-surface-3">
                                            {t("copied")}
                                        </Typography>
                                    }
                                    className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
                                    onClick={handleCopied}
                                />
                                <Button
                                    child={
                                        <Typography level="base2r" className="dark:text-tertiary text-surface-3">
                                            {t("dowload")}
                                        </Typography>
                                    }
                                    className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
                                    onClick={handleDownload}
                                />
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>    

                    {user.id !== userProfile?.id && (
                        <Button
                            child={
                                <Typography level="base2r" className="dark:text-tertiary text-surface-3">
                                    {isFollowed ? t("Unfollow") : t("Follow")}
                                </Typography>
                            }
                            className="p-3"
                            onClick={handleFollow}
                        />
                    )}

                    {user.id === userProfile?.id && (
                        <Link href={`/profile/${user.id}/edit`}>
                            <Button
                                child={
                                    <Typography level="base2r" className="dark:text-secondary text-surface-2">
                                        {t("edit profile")}
                                    </Typography>
                                }
                                className="hidden md:block px-5 py-2"
                            />
                        </Link>
                    )}
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-4">
                    <Typography level="body2r" className="dark:text-tertiary text-surface opacity-80">
                        {user.bio}
                    </Typography>
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-sm base opacity-80 cursor-pointer rounded-button px-3 py-2">
                            <CommentIcon />
                            <Typography level="base2r" className="dark:text-primary text-surface-3 flex items-center gap-2">
                                {user.postCount}
                                <Typography level="base2r" className="dark:text-tertiary text-surface">
                                    {t("posts")}
                                </Typography>
                            </Typography>
                        </div>
                        <Link href={`/profile/${user.id}/followers`}>
                            <div className="flex items-center gap-2 text-sm base opacity-80 cursor-pointer rounded-button px-3 py-2">
                                <ProfileIcon />
                                <Typography level="base2r" className="dark:text-primary text-surface-3 flex items-center gap-2">
                                    {user.followerCount}
                                    <Typography level="base2r" className="dark:text-tertiary text-surface">
                                        {t("followers")}
                                    </Typography>
                                </Typography>
                            </div>
                        </Link>
                    </div>

                    {user.websiteUrl && (
                        <div>
                            <LinkIcon />
                            <a>
                                <Typography>{user.websiteUrl}</Typography>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
