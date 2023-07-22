import axios from "axios";
import { WEB3_STORAGE_KEY, WEB3_STORAGE_URL } from "../constants";
import { Web3Storage } from "web3.storage";

// function makeStorageClient() {
//   return new Web3Storage({token: WEB3_STORAGE_KEY})
// }
const saveToIPFS = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  
  var config = {
    method: "post",
    url: WEB3_STORAGE_URL,
    headers: {
      Authorization: `Bearer ${WEB3_STORAGE_KEY}`,
      "Content-Type": "text/plain",
    },
    data: formData,
  };

  const response = await axios(config);
  console.log(response.data.cid);
  return response.data.cid;
};

export default saveToIPFS;
