import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import Logo from '../../assets/logo.jpg'
import "./index.css";
import { useNavigate } from "react-router-dom";

function BalanceDisplay() {
  const [balance, setBalance] = useState<any>(0);
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey || !connected) {
      return;
    }
    connection.onAccountChange(
      publicKey,
      (info) => {
        setBalance(info?.lamports || 0);
      },
      "confirmed"
    );
    connection.getBalance(publicKey).then((balance) => {
      setBalance(balance || 0);
    });
    // connection.getAccountInfo(publicKey).then((info) => {
    //   setBalance(info?.lamports || 0);
    // });
  }, [connection, publicKey, connected]);
  return (
    <div className="balance_wrapper">
      {publicKey
        ? `Bal: ${balance / LAMPORTS_PER_SOL}`
        : "Not Connected"}
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header_wrapper">
      <div className="sol_wallet_info_wrapper">
        <img src={Logo} className="header_logo" onClick={() => navigate('/')} />
        <BalanceDisplay />
      </div>
      <WalletMultiButton />
    </div>
  );
}

export default Header;
