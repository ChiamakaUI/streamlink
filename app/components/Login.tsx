import {
  DynamicContextProvider,
  DynamicEmbeddedWidget,
} from "@dynamic-labs/sdk-react-core";

import { SolanaWalletConnectors } from "@dynamic-labs/solana";

const Login = () => {
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "7550a575-2c16-4470-a533-1e85520046ba",
        walletConnectors: [SolanaWalletConnectors],
      }}
    >
      <div className="w-[85%] lg:w-[30%] mx-auto my-14">
        <DynamicEmbeddedWidget background="with-border" />
      </div>
    </DynamicContextProvider>
  );
};

export default Login;
