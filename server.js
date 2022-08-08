import express from 'express';
import bodyParser from 'body-parser'
import BnbManager from "./src/sdk.js";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))

var bnbManager = new BnbManager("https://bsc-dataseed1.binance.org:443");
const app = express(),
    port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/', (req, res) => {
    res.send("hello bsc_api")

});

app.post('/api/createWallet', (req, res) => {
    // #swagger.description = 'Create Wallet'
    /* #swagger.parameters['password'] = {
      description: 'User password',
      in: 'body',
      schema: { password: 'string' },
      type: 'object',
      required: true
    } */
    /* #swagger.responses[200] = {
        description: 'Generated Wallet',
        schema: { $ref: '#/definitions/Wallet' }
    } */

    const password = req.body.password;
    let wallet = bnbManager.createAccount(password)
    console.log(wallet);
    res.json(wallet);
});


app.post('/api/importWallet', (req, res) => {
    // #swagger.description = 'Import Wallet'
    /* #swagger.parameters['password'] = {
      description: 'User password and keystore',
      in: 'body',
      schema: { password: 'string', keystore:{$ref: '#/definitions/Keystore' } },
      type: 'object',
      required: true
    } */

    /* #swagger.responses[200] = {
        description: 'Generated Wallet',
        schema: { $ref: '#/definitions/Wallet' }
    } */
    try {
        const password = req.body.password;
        const keystore = req.body.keystore;
        let wallet = bnbManager.importWalletByKeystore(keystore, password)
        console.log(wallet);
        res.json(wallet);
    } catch (e) {
        return res.status(401).send({
            message: e.message
        });
    }
});

app.post('/api/bnbBalance', async function (req, res) {
    // #swagger.description = 'Get native BNB balance'

    /* #swagger.parameters['Address'] = {
      description: 'Wallet address',
      in: 'body',
      schema: { address: 'string' },
      type: 'object',
      required: true
    } */

    /* #swagger.responses[200] = {
        description: 'Wallet balance',
        type: 'object',
        schema: { $ref: '#/definitions/Balance' }
    } */
    try {
        const address = req.body.address;
        let balance = await bnbManager.getBnbBalance(address)
        console.log(balance);
        res.json(balance);
    } catch (e) {
        return res.status(401).send({
            message: e.message
        });
    }
});

app.post('/api/tokenBalance', async function (req, res) {
    // #swagger.description = 'Get token balance'

    /* #swagger.parameters['address'] = {
      description: 'Wallet address, Token Contract address',
      in: 'body',
      schema: { address: 'string',tokenAddress: 'string' },
      type: 'object',
      required: true
    } */

    /* #swagger.responses[200] = {
        description: 'Token balance',
        type: 'number',
        schema: { $ref: '#/definitions/tokenBalance' }
    } */
    try {
        const address = req.body.address;
        const tokenContractAddress = req.body.tokenAddress;
        let tokenBalance = await bnbManager.getBEPTokenBalance(tokenContractAddress, address)
        console.log(balance);
        res.json(tokenBalance);
    } catch (e) {
        return res.status(401).send({
            message: e.message
        });
    }
});


app.post('/api/sendBnb', async function (req, res) {
    // #swagger.description = 'Send native BNB'

    /* #swagger.parameters['body'] = {
      description: 'Data',
      in: 'body',
      schema: {
            password: 'string',
            toAddress: 'string',
            amount: 'string',
            keystore: {$ref: '#/definitions/Keystore'},
       },
      type: 'object',
      required: true
    } */

    /* #swagger.responses[200] = {
        description: 'Transaction hash',
        type: 'object',
        schema: { $ref: '#/definitions/transactionHash' }
    } */
    try {
        const keystore = req.body.keystore;
        const password = req.body.password;
        const toAddress = req.body.toAddress;
        const amount = req.body.amount;
        let tnsx = await bnbManager.sendBNB(keystore, password, toAddress, amount, 3)
        res.json({transaction: tnsx});
    } catch (e) {
        return res.status(401).send({
            message: e.message
        });
    }
});

app.post('/api/sendToken', async function (req, res) {
    // #swagger.description = 'Send tokens'
    /* #swagger.parameters['body'] = {
        description: 'User password',
        in: 'body',
        schema: {
            password: 'string',
            toAddress: 'string',
            tokenAddress: 'string',
            amount: 'string',
            keystore: {$ref: '#/definitions/Keystore'}
             },
        type: 'object',
        required: true
    } */

    /* #swagger.responses[200] = {
        description: 'Transaction hash',
        type: 'object',
        schema: { $ref: '#/definitions/transactionHash' }
    } */

    try {
        const keystore = req.body.keystore;
        const password = req.body.password;
        const tokenAddress = req.body.tokenAddress;
        const toAddress = req.body.toAddress;
        const amount = req.body.amount;
        let transaction = await bnbManager.sendToken(keystore, password, tokenAddress, toAddress, parseFloat(amount), 3)
        res.json(transaction);
    } catch (e) {
        return res.status(401).send({
            message: e.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

