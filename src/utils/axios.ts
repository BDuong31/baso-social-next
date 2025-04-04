'use client';

import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';

import { HOST_API } from '../global-config';
import { get } from 'http';
import { read } from 'fs';
import { updatePassword } from '@/apis/user';
import { verify } from 'crypto';

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token && config.headers){
            config.headers['Authorization'] =`Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) =>{
        if (error.response && error.response.status === 401){
            if (typeof window !== 'undefined'){
                const router = useRouter();
                router.push('/login');
            }
        }
        return Promise.reject(
            (error.response && error.response.data) || 'Đã xảy ra lỗi'
        )
    }
)

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) =>{
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config});

    return res.data;
}

const VERSION_PREFIX = '/v1';

export const endpoints = {
    auth: {
        login: `${VERSION_PREFIX}/authenticate`,
        register: `${VERSION_PREFIX}/register`,
        googleLogin: `${VERSION_PREFIX}/google-login`,
        f2a: (id: string) => `${VERSION_PREFIX}/users/${id}/2fa`,
        verifyF2a:(id: string) => `${VERSION_PREFIX}/users/${id}/2fa`,
    },

    user: {
        get: `${VERSION_PREFIX}/users`,
        getListUser: `${VERSION_PREFIX}/rpc/users/list-by-ids`,
        create: `${VERSION_PREFIX}/users`,
        update: `${VERSION_PREFIX}/profile`,
        adminUpdate : (id: string) => `${VERSION_PREFIX}/users/${id}`,
        delete: (id: string) => `${VERSION_PREFIX}/users/${id}`,
        updatePassword: `${VERSION_PREFIX}/update-password`,
        profile: `${VERSION_PREFIX}/profile`,
        bookmark: (id: string) => `${VERSION_PREFIX}/users/${id}/saved-posts`,
        followers: (id: string) => `${VERSION_PREFIX}/users/${id}/followers`,
        followings: (id: string) => `${VERSION_PREFIX}/users/${id}/followings`,
        follow: (id: string) => `${VERSION_PREFIX}/users/${id}/follow`,
        unfollow: (id: string) => `${VERSION_PREFIX}/users/${id}/unfollow`,
        profileById: (id: string) => `${VERSION_PREFIX}/rpc/users/${id}`,
        hasFollowed: (id: string) => `${VERSION_PREFIX}/users/${id}/has-followed`,
    },

    post: {
        get: `${VERSION_PREFIX}/posts`,
        create: `${VERSION_PREFIX}/posts`,
        update: (id: string) => `${VERSION_PREFIX}/posts/${id}`,
        delete: (id: string) => `${VERSION_PREFIX}/posts/${id}`,
        detail: `${VERSION_PREFIX}/posts/:id`,
        like: (id: string) => `${VERSION_PREFIX}/posts/${id}/like`,
        unlike: (id: string) => `${VERSION_PREFIX}/posts/${id}/unlike`,
        save: (id: string) => `${VERSION_PREFIX}/posts/${id}/save`,
        unsave: (id: string) => `${VERSION_PREFIX}/posts/${id}/unsave`,
    },

    media: {
        upload: `${VERSION_PREFIX}/upload-file`,
    },

    topic: {
        get: `${VERSION_PREFIX}/topics`,
        detail: `${VERSION_PREFIX}/topics/:id`,
        create: `${VERSION_PREFIX}/topics`,
        delete: (id: string) => `${VERSION_PREFIX}/topics/${id}`,
    },

    notification: {
        get: `${VERSION_PREFIX}/notifications`,
        read: (id: string) => `${VERSION_PREFIX}/notifications/${id}/read`,
        readAll: `${VERSION_PREFIX}/notifications/read-all`,  
    },

    comment: {
        get: `${VERSION_PREFIX}/comments`,
    },

    chat: {
        getConversations: `${VERSION_PREFIX}/chat-rooms`, // Lấy danh sách các cuộc hội thoại
        getMessages: (conversationId: string) => `${VERSION_PREFIX}/chat-messages/${conversationId}`, // Lấy tin nhắn
        sendMessage: (conversationId: string) => `${VERSION_PREFIX}/chat/conversations/${conversationId}/send`, // Gửi tin nhắn
        createConversation: `${VERSION_PREFIX}/chat-rooms`, // Tạo hội thoại mới
        sendFile: (conversationId: string) => `${VERSION_PREFIX}/chat/conversations/${conversationId}/send-file`, // Gửi file
        sendImage: (conversationId: string) => `${VERSION_PREFIX}/chat/conversations/${conversationId}/send-image`, // Gửi ảnh
        sendAudio: (conversationId: string) => `${VERSION_PREFIX}/chat/conversations/${conversationId}/send-audio`, // Gửi ghi âm
    },
}