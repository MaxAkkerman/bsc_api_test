## BSC API

### Create Wallet

```js
import BnbManager from "../src/sdk.js";

bnbManager.createAccount("12345")
  .then(res => {
     console.log(res);
  });
```


### Import Wallet by Keystore

```js
import BnbManager from "../src/sdk.js";

let keystore = {};
let password = '';
bnbManager.importWalletByKeystore(keystore,password)
  .then(res => {
      console.log(res);
    });
```

### Import Wallet by Private key

```js
import BnbManager from "../src/sdk.js";

let privateKey = '';
bnbManager.importWalletByPrivateKey(privateKey)
  .then(res => {
        console.log(res);
      });
```

### Get BNB balance

```js
import BnbManager from "../src/sdk.js";

let address = '';
bnbManager.getBnbBalance(address)
  .then(res => {
          console.log(res);
        });
```


### Get BEP20 token balance

```js
import BnbManager from "../src/sdk.js";

let tokenContractAddress = '';
let address = '';
bnbManager.getBEPTokenBalance(tokenContractAddress, address)
  .then(res => {
            console.log(res);
        });
```

### Send BEP20 token

```js
import BnbManager from "../src/sdk.js";

let keystore = {};
let password = '';
let tokenContractAddress = '';
let toAddress = '';
let amount = '';
bnbManager.sendToken(keystore, password, tokenContractAddress , toAddress , amount )
  .then(res => {
            console.log(res);
        });
```


### Send BNB

```js
import BnbManager from "../src/sdk.js";

let keystore = {};
let password = '';
let toAddress = '';
let amount = '';
bnbManager.sendBNB(keystore, password , toAddress , amount)
  .then(res => {
            console.log(res);
        });
```
