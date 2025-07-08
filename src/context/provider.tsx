import { UserProvider } from "./userContext/userContext";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
