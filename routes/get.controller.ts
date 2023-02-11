import { Request, Response } from 'express';

function getRocket(Request: Request, Response: Response) {
    
    const wallet_address = Request.header.wallet_address;

    getListAssets(wallet_address, 'name')
    .then((result) => {
      //print the result
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });

}

export {
    getRocket
}

const getListAssets = async (
    collectionAddress: string,
    orderBy: 'updated_at' | 'name'
  ) => {
    const response = await client.listAssets({
      collection: collectionAddress,
      orderBy: orderBy,
    });
    return response.result;
  };


