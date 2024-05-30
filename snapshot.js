
const fs = require('fs');
const url = `https://mainnet.helius-rpc.com/?api-key=d1d9de85-269d-464d-a275-dffe661df53d`;

const getAssetsByCreator = async () => {
  let page = 1;
  let allMintAddresses = [];

  while (true) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: `my-id-page-${page}`,
        method: 'getAssetsByCreator',
        params: {
          creatorAddress: '7RDmUQwrmVtKpT6w8LGAfW71RheAoPR3p2ycm8mSpDYY',
          onlyVerified: true,
          page: page,
          limit: 1000
        },
      }),
    });

    const { result } = await response.json();

    // If there are no more items, break the loop
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }else{
      if (!result.items || result.items.length === 0) {
        break;
      }
    }

    // Extract mint addresses and add them to the list
    const mintAddresses = result.items.map(item => item.id); 
    allMintAddresses.push(...mintAddresses);

    // Check if there are less than 1000 results to stop further requests
    if (result.items.length < 1000) {
      break;
    }

    page++;
  }

  // Join the addresses by comma
  const addressesString = allMintAddresses.join(',');
  console.log("All Mint Addresses: ", addressesString);
  fs.writeFileSync('addresses.json', JSON.stringify(allMintAddresses, null, 2));
};

getAssetsByCreator();
