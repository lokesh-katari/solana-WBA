import wallet from "../dev-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

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
    //1. Load image
    const image = await readFile(
      "/home/lokesh/Desktop/solana-starter/ts/cluster1/WBA.png"
    );
    console.log(image);
    const genericFile = createGenericFile(image, "WBA.png", {
      contentType: "image/png",
    });
    const [myUri] = await umi.uploader.upload([genericFile]);

    console.log(myUri, "this is uri");

    //2. Convert image to generic file.
    //3. Upload image
    // const image = ???
    // const [myUri] = ???
    // console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
