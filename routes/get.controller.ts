import { Request, Response } from 'express';
import { request } from 'http';

function getRocket(Request: Request, Response: Response) {
    if (Request.headers.wallet_address) {
      const wallet_address = Request.headers.wallet_address[0];
      getListAssets(wallet_address, 'name')
      .then((result) => {
        //print the result
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    
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


