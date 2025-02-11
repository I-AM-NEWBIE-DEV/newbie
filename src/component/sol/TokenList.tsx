import { useEffect, useState } from "react";
import { TOKEN_PROGRAM_ID, NATIVE_MINT } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Toast, Ellipsis, Popup, Tag } from "antd-mobile";
import { solanaStore } from "../../store";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const token_item_wrapper: any = {
  fontSize: "14px",
  width: "100%",
  padding: "16px",
  wordBreak: "break-all",
  height: "48px",
  border: "2px solid rgba(30, 163, 181, 0.15)",
  borderRadius: "6px",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

function TokenList() {
  const { setCurrentTokenInfo, refreshTimestamp, currentTokenInfo }: any =
    solanaStore();

  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [visible, setVisible] = useState(false);
  const [tokenAccounts, setTokenAccounts] = useState<any[]>([]);
  const [defaultTokenAccounts, setDefaultTokenAccounts] = useState<any[]>([]);

  const [token, setToken] = useState<any>();
  const setValueHandler = (tokenInfo: any) => {
    setCurrentTokenInfo(tokenInfo);
    setToken(tokenInfo);
    setVisible(false);
  };
  const setVisibleHandler = () => {
    if (!connected) {
      Toast.clear();
      Toast.show({ content: "please connect your wallet", position: "center" });
      return;
    }
    setVisible(true);
  };
  useEffect(() => {
    // reset some state
    setTokenAccounts([]);
    setDefaultTokenAccounts([]);

    if (!connection || !publicKey || !connected) {
      setToken(null);
      setCurrentTokenInfo(null);
      return;
    }

    connection.getBalance(publicKey).then((balance) => {
      // const balanceValue = balance / LAMPORTS_PER_SOL;
      // const data = [
      //   {
      //     mint: NATIVE_MINT.toBase58(),
      //     balance: balanceValue || 0,
      //     decimals: 9,
      //     sol: true,
      //   }
      // ]
      // setDefaultTokenAccounts(data);

      connection
        .getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        })
        .then((info) => {
          const data: any = info.value
            .map((account) => {
              return {
                // pubkey: account.pubkey.toBase58(),
                // ownerPubkey: account.account.owner.toBase58(),
                mint: account.account.data.parsed.info.mint, // Token contract address
                balance: account.account.data.parsed.info.tokenAmount.uiAmount, // User token balance
                decimals: account.account.data.parsed.info.tokenAmount.decimals, // Token precision
              };
            })
            .map((item) => {
              if (item.mint === NATIVE_MINT.toBase58()) {
                return {
                  ...item,
                  sol: true,
                  balance: balance / LAMPORTS_PER_SOL,
                };
              }
              return { ...item };
            });

          // 更新当前选中代币余额
          const updateCurrentToken = data?.find(
            (item: any) => item?.mint === currentTokenInfo?.mint
          );
          if (updateCurrentToken) {
            setToken(updateCurrentToken);
            setCurrentTokenInfo(updateCurrentToken);
          }
          if (currentTokenInfo?.mint && !updateCurrentToken) {
            setToken(null);
            setCurrentTokenInfo(null);
          }

          setTokenAccounts(data);
        });
    });
  }, [publicKey, connected, connection, refreshTimestamp]);

  return (
    <div className="token_list_wrapper">
      <div
        onClick={setVisibleHandler}
        style={{
          width: "100%",
          fontSize: "17px",
        }}
      >
        {token ? (
          <div className="token_address_wrapper">
            <Ellipsis direction="end" content={token?.mint} />
            <Tag>{token?.balance}</Tag>
          </div>
        ) : (
          <div style={{ color: "var(--adm-color-light)" }}>
            please select a token
          </div>
        )}
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
      >
        <div
          style={{
            height: "40vh",
            overflowY: "scroll",
            padding: "12px",
            backgroundColor: "var(--app-theme-bg-color1)",
          }}
        >
          {tokenAccounts.map((item) => {
            return (
              <div
                key={item?.mint}
                onClick={() => setValueHandler(item)}
                className="token_item"
                style={token_item_wrapper}
              >
                <Ellipsis direction="end" content={item?.mint} />
                <Tag>{item?.balance}</Tag>
              </div>
            );
          })}
        </div>
      </Popup>
    </div>
  );
}

export default TokenList;
