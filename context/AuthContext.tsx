"use client"

import React from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

interface Children {
  children: React.ReactNode;
}

const AuthContext: React.FC<Children> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "7550a575-2c16-4470-a533-1e85520046ba",
        walletConnectors: [SolanaWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: (args) => {
            console.log("onAuthSuccess was called", args);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};

export default AuthContext;
