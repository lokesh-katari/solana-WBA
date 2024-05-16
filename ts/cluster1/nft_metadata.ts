// import wallet from "../dev-wallet.json";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import {
//   createGenericFile,
//   createSignerFromKeypair,
//   signerIdentity,
// } from "@metaplex-foundation/umi";
// import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

// // Create a devnet connection
// const umi = createUmi("https://api.devnet.solana.com");
// const bundlrUploader = createBundlrUploader(umi);

// let keypair = umi.eddsa.createKeypairFromSecretKey(
//   new Uint8Array(wallet.wallet)
// );
// const signer = createSignerFromKeypair(umi, keypair);

// umi.use(signerIdentity(signer));

// (async () => {
//   try {
//     // Follow this JSON structure
//     // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

//     const image =
//       "https://arweave.net/GJ5VPm4PsWYAEHk6XQkV44_94l1oXbhJOMKruIgXHPo";
//     const metadata = {
//       name: "LRUG",
//       symbol: "LRUG",
//       description: "hey there this is a  rug",
//       image: image,
//       attributes: [
//         { trait_type: "color", value: "purple" },
//         { trait_type: "image", value: "png" },
//       ],
//       properties: {
//         files: [
//           {
//             type: "image/png",
//             uri: image,
//           },
//         ],
//       },
//       creators: [],
//     };
//     const myUri = await umi.uploader.uploadJson(metadata);
//     console.log("Your image URI: ", myUri);
//     process.exit(0);
//   } catch (error) {
//     console.log("Oops.. Something went wrong", error);
//   }
// })();
import wallet from "../dev-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(
  new Uint8Array(wallet.wallet)
);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
    const image =
      "https://arweave.net/ZvggTrN-Yd67C_tqJVkqh5CFzYN_I-_1PjQ4Nf5-JlI";
    const metadata = {
      name: "Web3 Vanguard",
      symbol: "WBA",
      description: "Behold the emblem of innovation, the insignia of progress ",
      image: image,
      attributes: [
        { trait_type: "symbol", value: "Web3 Builders Alliance Logo" },
        { trait_type: "format", value: "PNG" },
        {
          trait_type: "blockchain_heritage",
          value: "Immutable and transparent",
        },
        {
          trait_type: "digital_legacy",
          value: "Embodies the legacy of the Web3 Builders Alliance",
        },
        {
          trait_type: "collective_identity",
          value: "Membership in the vanguard of Web3 innovation",
        },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log(myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
