import { create } from "zustand";
import { configurePersist } from "zustand-persist";

const { persist, purge } = configurePersist({
  storage: sessionStorage, // use `AsyncStorage` in react native
  rootKey: "newbie.roots", // optional, default value is `root`
});

const solanaStore = create(
  persist(
    {
      key: "solanaStore", // required, child key of storage
      // allowlist: ["isAuthenticated", "user"], // optional, will save everything if allowlist is undefined
      // denylist: [], // optional, if allowlist set, denylist will be ignored
    },
    (set): any => ({
      refreshTimestamp: null,
      setRefreshTimestamp: (time: any) => set((state: any) => ({ refreshTimestamp: time })),

      currentTokenInfo: null,
      setCurrentTokenInfo: (info: any) => set((state: any) => ({ currentTokenInfo: info })),

      isConnected: false,
      setIsConnected: (flag: any) => set((state: any) => ({ isConnected: flag })),
    })
  )
);

export default solanaStore;
