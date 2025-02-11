<!-- - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
``` -->


[GENERATE TOKEN](https://chat.deepseek.com/a/chat/s/5d319153-f66c-4187-9aab-afbb41398db6)

## GENERATE KEY PAIR
```js
  import {
    Keypair,
  } from "@solana/web3.js";

  // KEY PAIR
  const keypair = Keypair.generate();
  // SAE KEY PAIR
  localStorage.setItem('walletKey', JSON.stringify(Array.from(keypair.secretKey)));
```

## GENERATE KEY PAIR OWN
```js
  import {
    Keypair,
  } from "@solana/web3.js";

  const keypair = Keypair.fromSecretKey(
    bs58.decode(secretKey)
  );
  const keypair = Keypair.fromSecretKey(
    Uint8Array.from([
      174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
      222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
      15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
      121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
    ])
  );
```


## RequestAirdrop

```js
  import {
    LAMPORTS_PER_SOL,
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    clusterApiUrl,
    PublicKey,
  } from "@solana/web3.js";


  const keypair = Keypair.fromSecretKey(
    bs58.decode(secretKey)
  );
  // const keypair = Keypair.fromSecretKey(
  //   Uint8Array.from([
  //     174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
  //     222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
  //     15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
  //     121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
  //   ])
  // );

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    1 * LAMPORTS_PER_SOL // 1 SOL（测试网代币）
  );
  await connection.confirmTransaction(airdropSignature);
```
