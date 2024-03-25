"use client";
import { useContext } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { register } from "@/actions/auth";
import { UserContext } from "./UserContext";

interface Children {
  children: React.ReactNode;
}

const AuthContext: React.FC<Children> = ({ children }) => {
  const { setUser } = useContext(UserContext)
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "7550a575-2c16-4470-a533-1e85520046ba",
        walletConnectors: [SolanaWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: async(args) => {
            const {
              user: {
                email,
                firstName,
                lastName,
                verifiedCredentials: [{ address }],
              },
            } = args;
            if (address !== undefined) {
              const signedInUser = await register({
                name: `${firstName} ${lastName}`,
                email,
                wallet: address,
              });

              localStorage.setItem("user", JSON.stringify(signedInUser));
              setUser(signedInUser)
            }
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default AuthContext;
