import { wallet } from "../dev-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";

// Define our Mint address
const mint = publicKey("6L38xEaJqM5pV1Y56Vsx57Rfd411vjeKsG5Q11BCE1TW");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    // let accounts: CreateMetadataAccountV3InstructionAccounts = {
    //     ???
    // }
    // let data: DataV2Args = {
    //     ???
    // }
    // let args: CreateMetadataAccountV3InstructionArgs = {
    //     ???
    // }
    // let tx = createMetadataAccountV3(
    //     umi,
    //     {
    //         ...accounts,
    //         ...args
    //     }
    // )
    // let result = await tx.sendAndConfirm(umi).then(r => r.signature.toString());
    // console.log(result);
    let metadataPda = findMetadataPda(umi, { mint });

    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      // metadata:metadataPda,
      mintAuthority: signer,
      payer: signer,
      updateAuthority: signer,
    };

    let data: DataV2Args = {
      name: "My NFT",
      symbol: "NFT",
      uri: "",
      sellerFeeBasisPoints: 500,
      creators: [{ address: keypair.publicKey, share: 100, verified: false }],
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, { ...accounts, ...args });
    let result = await tx
      .sendAndConfirm(umi)
      .then((r) => r.signature.toString());
    console.log(result);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
