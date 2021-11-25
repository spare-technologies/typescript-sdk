# typescript-sdk

### Usage

1- Download npm package

npm install <package_name>

2- Import package to the desire component

```javascript
import * as sdk from '<package_name>'
```

3- Create a client instance from SpPaymentClient class

```javascript
const client = new sdk.SpPaymentClient(
    {
            ApiKey : "Your api key",
            AppId : "Your app id",
            BaseUrl : "https://payment.tryspare.com"
    }
)
```

4 - Implement Domestic Payment api

- List Payments
```javascript
const payments = await client.ListDomesticPayments(0, 10)
```

- Get Payment
```javascript
const payment = await client.GetDomesticPayment('d214857b-d654-48a0-b039-42b46b0e2')
```

- Create Payment

 // Initialize keys
```javascript
const PrivateKey = 'Your ecc private key';
const ServerPublicKey = 'Server ecc public key'
```

 // Initialize payment
```javascript
const payment = new sdk.SpDomesticPayment(10, 'test payment')
```

 // Sign the payment
```javascript
const signature = sdk.EccSignatureManager.sign(PrivateKey, payment)
```
 // Create payment
```javascript
const createdPayment = await client.CreateDomesticPayment(payment, signature)
```

 // To verify signature of the created payment
```javascript
if (sdk.EccSignatureManager.verify(ServerPublicKey, createdPayment.Payment, createdPayment.Signature)) {
    // Signature verified
}
```
