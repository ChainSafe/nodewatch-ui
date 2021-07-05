import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { SquarelinkConnector } from "@web3-react/squarelink-connector";

// TODO: these connectors are broken
// import { TorusConnector } from "@web3-react/torus-connector";
// import { AuthereumConnector } from "@web3-react/authereum-connector";

import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

const POLLING_INTERVAL = 8000;
export const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  3: "https://ropsten.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  42: "https://kovan.infura.io/v3/84842078b09946638c03157f83405213",
  5: "https://goerli.infura.io/v3/84842078b09946638c03157f83405213",
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const network = new NetworkConnector({
  urls: {
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    42: RPC_URLS[42],
    4: RPC_URLS[4],
    5: RPC_URLS[5]
  },
  defaultChainId: 5,
  pollingInterval: POLLING_INTERVAL
});

export const walletconnect = new WalletConnectConnector({
  rpc: { // ERROR WalletConnect root package throws error if more than 1
    1: RPC_URLS[1],
    // 3: RPC_URLS[3],
    // 42: RPC_URLS[42],
    // 4: RPC_URLS[4],
    // 5: RPC_URLS[5]
  },
  // bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[5],
  appName: "app"
});

export const ledger = new LedgerConnector({
  chainId: 5,
  url: RPC_URLS[5],
  pollingInterval: POLLING_INTERVAL
});

export const trezor = new TrezorConnector({
  chainId: 5,
  url: RPC_URLS[5],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/"
});

export const frame = new FrameConnector({ supportedChainIds: [
  // 1,
  // 3,
  // 4,
  // 42,
  5,
  // 100
] });

export const fortmatic = new FortmaticConnector({
  apiKey: "pk_live_F95FEECB1BE324B5",
  chainId: 4
});

export const portis = new PortisConnector({
  dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
  networks: [
    1,
    3,
    4,
    42,
    5,
    100
  ]
});

export const squarelink = new SquarelinkConnector({
  clientId: "5f2a2233db82b06b24f9",
  networks: [
    1,
    3,
    4,
    42,
    5,
    100
  ]
});


// export const torus = new TorusConnector({ chainId: 5 });

// export const authereum = new AuthereumConnector({ chainId: 42 });

export const connectorsByName = {
  Injected: injected,
  Network: network,
  WalletConnect: walletconnect,
  WalletLink: walletlink,
  Ledger: ledger,
  Trezor: trezor,
  Frame: frame,
  Fortmatic: fortmatic,
  Portis: portis,
  Squarelink: squarelink,
  // Torus: torus,
  // Authereum: authereum
};

// Connector hooks

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    // @ts-ignore
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        // @ts-ignore
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    // @ts-ignore
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = chainId => {
        console.log("chainChanged", chainId);
        // @ts-ignore
        activate(injected);
      };

      const handleAccountsChanged = accounts => {
        console.log("accountsChanged", accounts);
        if (accounts.length > 0) {
          // @ts-ignore
          activate(injected);
        }
      };

      const handleNetworkChanged = networkId => {
        console.log("networkChanged", networkId);
        // @ts-ignore
        activate(injected);
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }

    return () => {};
  }, [active, error, suppress, activate]);
}
