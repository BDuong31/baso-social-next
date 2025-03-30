
'use client';

import React from 'react';

import { getUserProfile } from '@/apis/user';
import { IUserProfile } from '@/interfaces/user';
import io from 'socket.io-client';

interface UserProfileContextType {
  userProfile: IUserProfile | null;
  setUserProfile: (profile: IUserProfile) => void;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = React.createContext<
  UserProfileContextType | undefined
>(undefined);


export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = React.useState<IUserProfile | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  let socket = io('https://basospark.youthscience.club/chat', {
      transports: ['websocket'],
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,       
  });
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      setUserProfile(res.data);
      socket.emit('register', { userId: res.data?.id });
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserProfile();

  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        loading,
        error,
        setUserProfile,
        refreshProfile: fetchUserProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = React.useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile phải được sử dụng trong UserProfileProvider');
  }
  return context;
}
