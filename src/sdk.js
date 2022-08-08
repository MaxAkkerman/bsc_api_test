import Web3 from 'web3';
import {bep20ABI} from "./bep20ABI.mjs";

class BnbManager {
    constructor(infuraUrl) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
    }

    createAccount(password) {
        let account = this.web3.eth.accounts.create(password);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(password);

        return {
            account: account,
            wallet: wallet,
            keystore: keystore,
        };
    }

    importWalletByKeystore(keystore, password) {
        let account = this.web3.eth.accounts.decrypt(keystore, password,false);
        let wallet = this.web3.eth.accounts.wallet.add(account);

        return {
            account: account,
            wallet: wallet,
            keystore: keystore,
        };
    }


    importWalletByPrivateKey(privateKey) {
        const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(this.web3.utils.randomHex(32));

        return {
            account: account,
            wallet: wallet,
            keystore: keystore,
        };
    }

    async getBEPTokenBalance(tokenAddress , address) {
        let contract = new this.web3.eth.Contract(bep20ABI, tokenAddress);
        let decimal = await contract.methods.decimals().call();
        let balance = await contract.methods.balanceOf(address).call();

        return {tokenBalance:balance / Math.pow(10,decimal)};
    }

    async getBnbBalance(address) {
        let balance = await this.web3.eth.getBalance(address);

        return {balance:balance / Math.pow(10,18)};
    }

    async sendBNB(keystore, password, toAddress, amount, chainId) {
        let account = this.web3.eth.accounts.decrypt(keystore, password,false);
        let wallet = this.web3.eth.accounts.wallet.add(account);

        const avgGasPrice = await this.web3.eth.getGasPrice();
        const createTransaction = await this.web3.eth.accounts.signTransaction(
            {
                from: wallet.address,
                to: toAddress,
                value: this.web3.utils.toWei(amount.toString(), 'ether'),
                gas: 21000,
                gasPrice : avgGasPrice
            },
            wallet.privateKey
        );

        const createReceipt = await this.web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );

        return {transactionHash:createReceipt.transactionHash};
    }

    async sendToken(keystore, password, tokenAddress , toAddress , amount , chainId) {
        let account = this.web3.eth.accounts.decrypt(keystore, password,false);
        let wallet = this.web3.eth.accounts.wallet.add(account);
        let abi = bep20ABI;
        let tokenAmount = this.web3.utils.toWei(amount.toString(), 'ether')
        let contract = new this.web3.eth.Contract(abi, tokenAddress, {from: wallet.address});

        const res = await contract.methods.transfer(toAddress, tokenAmount).send({
            from: wallet.address,
            gas: 150000
        });

        return {transactionHash:res};
    }

    // isMainNet() {
    //     return ("" +this.infuraUrl).includes("https://bsc-dataseed1.binance.org:443");
    // }

}

export default BnbManager;
