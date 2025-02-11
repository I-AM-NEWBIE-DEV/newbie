// src/BatchSendTokens.tsx
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Keypair,
  Message,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  mintTo,
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import bs58 from "bs58";

import {
  TextArea,
  // NoticeBar,
  Input,
  Button,
  // Space,
  Divider,
  Toast,
  WaterMark,
  Modal,
} from "antd-mobile";

import TokenList from "../../component/sol/TokenList";
import { solanaStore } from "../../store";

import { copyTextToClipboard, delay } from "../../tools/index";

import "./index.css";

const BatchSendTokens: React.FC = () => {
  const sendWaysObj = {
    Default: "Default",
    PrivateKey: "PrivateKey",
  };
  const sendWays = Object.entries(sendWaysObj).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const [way, setWay] = useState<string>(sendWaysObj.Default);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [token, setToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [privatekey, setPrivatekey] = useState<string>("");

  const { currentTokenInfo, setRefreshTimestamp }: any = solanaStore();

  const [transactionFee, setTransactionFee] = useState<number | null>(null);

  const [signs, setSigns] = useState<any>("");

  // signs ? (
  //   <div className="signs" onClick={() => copyTextToClipboard(signs)}>
  //     signatures: {signs}
  //   </div>
  // ) : null;

  const calculateTransactionFee = async (transactions: Transaction[]) => {
    // try {
    //   const { blockhash } = await connection.getRecentBlockhash();
    //   let totalFee = 0;
    //   for (const transaction of transactions) {
    //     transaction.recentBlockhash = blockhash;
    //     const message = transaction.compileMessage();
    //     const fee: any = await connection.getFeeForMessage(message);
    //     totalFee += fee.value;
    //   }
    //   setTransactionFee(totalFee / LAMPORTS_PER_SOL);
    // } catch (error) {
    //   console.error('Error calculating transaction fee:', error);
    //   setTransactionFee(null);
    // }
  };

  const showSign = (sign: any) => {
    Modal.show({
      title: "Send Success",
      content: (
        <div className="signs_wrapper" onClick={() => copyTextToClipboard(sign)}>
          <span className="signs_text">{sign}</span>
          <span className="signs_tip">copy</span>
        </div>
      ),
      closeOnMaskClick: true,
    });
  };

  const handleSendTokens = async () => {
    // Toast.clear();
    if (!publicKey) {
      Toast.show({ content: "please connect your wallet", position: "center" });
      return;
    }

    if (
      way === sendWaysObj.Default &&
      (!currentTokenInfo || !currentTokenInfo?.mint)
    ) {
      Toast.show({ content: "please select a token", position: "center" });
      return;
    }

    if (way === sendWaysObj.PrivateKey && !privatekey) {
      Toast.show({ content: "please input privatekey", position: "center" });
      return;
    }

    const tokens = [
      ...new Set(token?.split(/[\r\n,]+/)?.filter((item) => !!item)),
    ];
    if (!token || tokens?.length === 0) {
      Toast.show({ content: "please enter token", position: "center" });
      return;
    }

    const amounts = parseFloat((amount || 0) as unknown as string);
    if (!amount || isNaN(amounts)) {
      Toast.show({ content: "please enter amount", position: "center" });
      return;
    }

    const recipients = tokens?.map((item) => ({
      address: item?.trim(),
      amount: amounts,
    }));

    const sendSol = async () => {
      try {
        const transactions: Transaction[] = [];
        for (const { address, amount } of recipients) {
          const instruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(address),
            lamports: amount * LAMPORTS_PER_SOL,
          });
          const transaction = new Transaction().add(instruction);
          transactions.push(transaction);
        }

        // 获取 RecentBlockhash
        const { blockhash } = await connection.getRecentBlockhash();
        transactions.forEach((tx) => (tx.recentBlockhash = blockhash));

        await calculateTransactionFee(transactions);

        // 分批发送交易，每批最多 10 笔
        const batchSize = 10;
        for (let i = 0; i < transactions.length; i += batchSize) {
          const batch = transactions.slice(i, i + batchSize);
          const signatures: any[] = await Promise.all(
            batch.map(async (transaction) => {
              try {
                const signature = await sendTransaction(
                  transaction,
                  connection
                );
                await connection.confirmTransaction(signature, "confirmed");
                return signature;
              } catch (error) {
                console.error(
                  `Error sending transaction to ${
                    recipients[i + batch.indexOf(transaction)].address
                  }:`,
                  error
                );
                return null;
              }
            })
          );
          setRefreshTimestamp(Date.now());
          const sign = signatures.filter((sig) => sig !== null).join(", ");
          setSigns(sign);
          console.log("Batch sent:", sign);
          showSign(sign);
        }
      } catch (error) {
        console.log("Batch error:", error);
      }
    };

    const getFromWallet: any = () => {
      if (way === sendWaysObj.PrivateKey) {
        const fromWallet = Keypair.fromSecretKey(bs58.decode(privatekey));
        return fromWallet.publicKey;
        // const fromWallet1 = Keypair.fromSecretKey(Uint8Array.from(publicKey.toString()));
      }
      return publicKey;
    };

    const sendTokens = async () => {
      const mint = new PublicKey(currentTokenInfo?.mint);

      const fromWallet = getFromWallet();

      const transactions: Transaction[] = [];
      for (const { address, amount } of recipients) {
        const toWallet = new PublicKey(address);
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          fromWallet,
          mint,
          // fromWallet.publicKey
          publicKey
        );
        //get the token account of the toWallet Solana address, if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          fromWallet,
          mint,
          toWallet
        );
        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address,
            toTokenAccount.address,
            // fromWallet.publicKey,
            publicKey,
            amount * LAMPORTS_PER_SOL // it's 1 token, but in lamports
          )
        );
        transactions.push(transaction);
      }

      // 获取 RecentBlockhash
      const { blockhash } = await connection.getRecentBlockhash();
      transactions.forEach((tx) => (tx.recentBlockhash = blockhash));

      // 计算交易费用
      await calculateTransactionFee(transactions);

      const batchSize = 10;
      for (let i = 0; i < transactions.length; i += batchSize) {
        const batch = transactions.slice(i, i + batchSize);
        const signatures = await Promise.all(
          batch.map(async (transaction) => {
            try {
              const signature = await sendTransaction(transaction, connection);
              await connection.confirmTransaction(signature, "confirmed");
              return signature;
            } catch (error) {
              console.error(
                `Error sending transaction to ${
                  recipients[i + batch.indexOf(transaction)].address
                }:`,
                error
              );
              return null;
            }
          })
        );
        setRefreshTimestamp(Date.now());
        const sign = signatures.filter((sig) => sig !== null).join(", ");
        setSigns(sign);
        console.log("Batch sent:", sign);
        showSign(sign);
      }
    };
    if (currentTokenInfo?.sol) {
      await sendSol();
    } else {
      await sendTokens();
    }
  };

  return (
    <div className="batch_wrapper common-grid">
      <div className="token_wrapper">
        {/* <div className="send_way_wrapper">
          {sendWays?.map((item) => {
            return (
              <div
                key={item.value}
                onClick={() => setWay(item.value)}
                className={item.value === way ? "send_way_item active" : "send_way_item"}
              >
                {item.value}
              </div>
            );
          })}
        </div> */}
        {way === sendWaysObj.PrivateKey ? (
          <div className="warn_tip">
            Not recommended. Please be cautious and do not expose your private
            key.
          </div>
        ) : null}
        {way === sendWaysObj.Default ? (
          <>
            <Divider
              style={{
                color: "#a1adad",
                borderColor: "#a1adad",
                borderStyle: "dashed",
              }}
            >
              Token Address
            </Divider>
            <TokenList />
          </>
        ) : null}

        {way === sendWaysObj.PrivateKey ? (
          <>
            <Divider
              style={{
                color: "#a1adad",
                borderColor: "#a1adad",
                borderStyle: "dashed",
              }}
            >
              PrivateKey
            </Divider>
            <TextArea
              placeholder="input your privatekey"
              autoSize={{ minRows: 2, maxRows: 4 }}
              value={privatekey}
              onChange={(val) => {
                setPrivatekey(val);
              }}
              className="token_wallet_list_wrapper"
            />
          </>
        ) : null}

        <Divider
          style={{
            color: "#a1adad",
            borderColor: "#a1adad",
            borderStyle: "dashed",
          }}
        >
          List of Recipient Address
        </Divider>
        <TextArea
          placeholder={"token1,\ntoken2,\ntoken3"}
          defaultValue={"token1,\ntoken2,\ntoken3"}
          autoSize={{ minRows: 10, maxRows: 20 }}
          value={token}
          onChange={(val) => {
            setToken(val);
          }}
          className="token_wallet_list_wrapper"
        />
        <Divider
          style={{
            color: "#a1adad",
            borderColor: "#a1adad",
            borderStyle: "dashed",
          }}
        >
          Quantity per Address Transfer
        </Divider>
        <Input
          placeholder="input transfer amount"
          clearable
          value={amount}
          onChange={(val) => {
            setAmount(val);
          }}
          className="token_wallet_list_wrapper"
        />
        {
          // signs ? <div className="signs" onClick={() => copyTextToClipboard(signs)}>signatures: {signs}</div> : null
        }
        <Button
          className="confirm_btn_wrapper"
          block
          color="success"
          size="large"
          onClick={handleSendTokens}
          loading="auto"
        >
          <div>Start Airdrop</div>
          <div>
            {transactionFee !== null
              ? `transactionFee: ${transactionFee.toFixed(6)} SOL`
              : null}
          </div>
        </Button>
        {/* </Space> */}
      </div>
    </div>
  );
};

export default BatchSendTokens;
