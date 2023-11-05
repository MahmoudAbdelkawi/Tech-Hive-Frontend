import {create} from 'zustand';
import UserType from '../types';

type UserStore = {
    user: UserType;
    setUser: (user: UserType) => void;
    clearUser: () => void;
    getUser: () => UserType; // Define the return type for the getUser function
  };

const userStore = create<UserStore>((set, get) => ({
    user: {} as UserType,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: {} as UserType }),
    getUser: () => get().user,
  }));

export default userStore;
