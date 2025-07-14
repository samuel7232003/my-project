import { UserProvider } from "./userContext/userContext";
import { ProductProvider } from "./productContext/productContext";
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </UserProvider>
  );
}
