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

//Lst
```javascript
client.ListDomesticPayments(0, 10)
```

//Gist
```javascript
client.GetDomesticPayment('d214857b-d654-48a0-b039-42b46b0e2')
```

//Create
```javascript
 client.CreateDomesticPayment({
        Amount : 10,
        Description : "Test domistic payment",
        FailUrl : "https://furl.com",
        SuccessUrl : "https://surl.com"
})
```
