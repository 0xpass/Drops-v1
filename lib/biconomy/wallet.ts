import {SmartBiconomyConfig, BiconomySmartConnector} from "./connector";


export const smartWalletWithBiconomy = (wallet: any, config: SmartBiconomyConfig): any => ({
  ...wallet,
  name: `⚡ ${wallet.name} ⚡ `,
  iconBackground: '#615555',
  createConnector: function() {
    const originalConnectorObject = wallet.createConnector.call(this);
    const connectorWithAA = BiconomySmartConnector(originalConnectorObject.connector, config);
    return {
      ...originalConnectorObject,
      connector: connectorWithAA,
    };
  },
});

