
const fs = require('fs');

const editWebhook = async () => {
    try {
      // Read the JSON file
      const addresses = JSON.parse(fs.readFileSync('addresses.json', 'utf8'));
  
      const response = await fetch(
        "https://api.helius.xyz/v0/webhooks/?api-key=d1d9de85-269d-464d-a275-dffe661df53d",
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            webhookURL: "https://test-helius-worker.uj0206004.workers.dev/",
            transactionTypes: ["NFT_LISTING","NFT_SALE"],
            accountAddresses: addresses,  // Use the addresses from the file
            webhookType: "enhanced"
          }),
        }
      );
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.error("error", e);
    }
  };
  
  editWebhook();
