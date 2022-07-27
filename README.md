# typescript-sdk
![npm](https://img.shields.io/npm/v/@spare-technologies/spare-typescript-sdk)
![Test and analyse workflow](https://github.com/spare-technologies/typescript-sdk/actions/workflows/dev_build_and_analyse.yml/badge.svg)
![Build and deploy workflow](https://github.com/spare-technologies/typescript-sdk/actions/workflows/master_build_and_deploy.yml/badge.svg)
### Usage

#### I- Download npm package

```bash
npm i @spare-technologies/spare-typescript-sdk
```

#### II- To Generate ECC key pair

```javascript
import * as sdk from '@spare-technologies/spare-typescript-sdk'

const keys = sdk.SpCrypto.GenerateKeyPair();

console.log("Private key \n" + keys.privateKey);
console.log("Public key \n" + keys.publicKey);

```

#### III- To create your first payment request

```javascript
import * as sdk from '@spare-technologies/spare-typescript-sdk'

const PrivateKey = 'Your ecc private key';
const ServerPublicKey = 'Spare ecc public key'

const client = sdk.SpPaymentClient({
    appid
})

// Configure client
const client = new sdk.SpPaymentClient(
    {
        apiKey: "Your api key",
        appId: "Your app id",
        baseUrl:  "https://payment.tryspare.com"
    });

// Initialize payment
const payment = new sdk.SpDomesticPayment(10, 'Payment from Spare sdk');

// Sign the payment
const signature = sdk.EccSignatureManager.sign(PrivateKey, payment)

// Create payment
const createdPayment = await client.CreateDomesticPayment(payment, signature)

// To verify signature of the created payment
if (sdk.EccSignatureManager.verify(ServerPublicKey, createdPayment.payment, createdPayment.signature)) {
    // Signature verified
}
```
