import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { ImLogger, WinstonLogger } from '@imtbl/imlogging';
import { CreateCollectionParams, ImmutableXClient } from '@imtbl/imx-sdk';
import { requireEnvironmentVariable } from 'libs/utils';

import env from '../config/client';
import { loggerConfig } from '../config/logging';

const provider = new AlchemyProvider(env.ethNetwork, env.alchemyApiKey);
const log: ImLogger = new WinstonLogger(loggerConfig);

const component = '[IMX-CREATE-COLLECTION]';

(async (): Promise<void> => {
  const privateKey = requireEnvironmentVariable('OWNER_ACCOUNT_PRIVATE_KEY');
  const collectionContractAddress = requireEnvironmentVariable(
    'COLLECTION_CONTRACT_ADDRESS',
  );
  const projectId = requireEnvironmentVariable('COLLECTION_PROJECT_ID');

  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);
  const ownerPublicKey = wallet.publicKey;

  const user = await ImmutableXClient.build({
    ...env.client,
    signer,
    enableDebug: true,
  });

  log.info(component, 'Creating collection...', collectionContractAddress);

  /**
   * Edit your values here
   */
  const params: CreateCollectionParams = {
    name: 'COSMIC-COLLECTIBLES',
    // description: 'ENTER_COLLECTION_DESCRIPTION (OPTIONAL)',
    contract_address: collectionContractAddress,
    owner_public_key: ownerPublicKey,
    icon_url: 'https://gateway.pinata.cloud/ipfs/QmfBZy7jNQkZ1EKnCjfVTw314ketj2KCV9ApY6feB3fxzA?_gl=1*o778i9*_ga*Mzg2NTExMTM3LjE2NzYxNDE3NjU.*_ga_5RMPXG14TE*MTY3NjE1Njg3My4yLjAuMTY3NjE1Njg4MS41Mi4wLjA.',
    metadata_api_url: 'https://gateway.pinata.cloud/ipfs/QmRhiBNCvHTdsvB2rCZGJcTDR6Qjtx2fmr27yWWm5nHrBZ/?_gl=1*e5ybd7*_ga*Mzg2NTExMTM3LjE2NzYxNDE3NjU.*_ga_5RMPXG14TE*MTY3NjE1Njg3My4yLjAuMTY3NjE1Njg4MS41Mi4wLjA.',
    collection_image_url: 'https://gateway.pinata.cloud/ipfs/QmfBZy7jNQkZ1EKnCjfVTw314ketj2KCV9ApY6feB3fxzA?_gl=1*o778i9*_ga*Mzg2NTExMTM3LjE2NzYxNDE3NjU.*_ga_5RMPXG14TE*MTY3NjE1Njg3My4yLjAuMTY3NjE1Njg4MS41Mi4wLjA.',
    project_id: parseInt(projectId, 10),
  };

  let collection;
  try {
    collection = await user.createCollection(params);
  } catch (error) {
    throw new Error(JSON.stringify(error, null, 2));
  }

  log.info(component, 'Created collection');
  console.log(JSON.stringify(collection, null, 2));
})().catch(e => {
  log.error(component, e);
  process.exit(1);
});
