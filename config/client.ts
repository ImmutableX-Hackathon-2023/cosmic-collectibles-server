import { config } from 'dotenv';
config();

export default {
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  ethNetwork: process.env.ETH_NETWORK,
  client: {
    publicApiUrl: process.env.PUBLIC_API_URL as string,
    starkContractAddress: process.env.STARK_CONTRACT_ADDRESS,
    registrationContractAddress: process.env.REGISTRATION_ADDRESS,
    gasLimit: process.env.GAS_LIMIT,
    gasPrice: process.env.GAS_PRICE,
  },
  // Bulk minting
  privateKey1: process.env.PRIVATE_KEY1,
  tokenId: process.env.TOKEN_ID,
  tokenAddress: process.env.TOKEN_ADDRESS,
  bulkMintMax: process.env.BULK_MINT_MAX,
  // Onboarding
  ownerAccountPrivateKey: process.env.OWNER_ACCOUNT_PRIVATE_KEY,
  collectionContractAddress: process.env.COLLECTION_CONTRACT_ADDRESS,
  collectionProjectId: process.env.COLLECTION_PROJECT_ID,
};
