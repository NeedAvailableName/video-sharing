const CONTRACT_ADDRESS = '0x68b48C809cFBd696E0b17E68DfE07AD43E2787B7'
const WEB3_STORAGE_URL = 'https://api.web3.storage/upload'
const WEB3_STORAGE_KEY = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY
const SUB_GRAPH_BASE_URL = 'https://api.thegraph.com'
const SUB_GRAPH_NAME = 'needavailablename/youtube-testv1'
const SUB_GRAPH_URL = `${SUB_GRAPH_BASE_URL}/subgraphs/name/${SUB_GRAPH_NAME}`

export {
  CONTRACT_ADDRESS,
  WEB3_STORAGE_URL,
  SUB_GRAPH_URL,
  WEB3_STORAGE_KEY,
}
