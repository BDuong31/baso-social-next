"use client";

import { Button } from "@/components/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
        {session ? (
          <div>
            <img src={session.user?.image || ""} alt="Avatar" className="w-16 h-16 rounded-full mx-auto" />
            <h1 className="text-xl font-bold mt-4">{session.user?.name}</h1>
            <p className="text-sm text-gray-400">Email: {session.user?.email}</p>
            <p className="text-sm text-gray-400">Username: {session.user?.username}</p>
            <p className="text-sm text-gray-400">First Name: {session.user?.firstName}</p>
            <p className="text-sm text-gray-400">Last Name: {session.user?.lastName}</p>

            {/* <button
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
              onClick={() => signOut()}
            >
              Đăng xuất
            </button> */}
            <Button
              child="Đăng xuất"
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"

            />
          </div>
        ) : (
          <Button
            child="Đăng nhập với Google"
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          />
        )}
      </div>
    </div>
  );
}
