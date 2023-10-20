// @ts-nocheck
import React, { useState, useRef } from "react";
import { Sidebar, Header } from "../../layout";
import { BiCloud, BiPlus } from "react-icons/bi";
import { Background } from "../../components";
import { saveToIPFS, getContract } from "../../utils";

export default function Upload() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Music");
  const [thumbnail, setThumbnail] = useState<File>();
  const [uploadData, setUploadData] = useState({});
  const [video, setVideo] = useState<File>();
  const [videoData, setVideoData] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>();

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const goBack = () => {
    window.history.back();
  };

  // When a user clicks on the upload button
  const handleSubmit = async () => {
    setLoading(true);
    // Calling the upload video function
    const videoCID = await uploadVideo();
    // Calling the upload thumbnail function and getting the CID
    const thumbnailCID = await uploadThumbnail();
    // Creating a object to store the metadata

    let data = {
      video: videoCID,
      title,
      description,
      category,
      thumbnail: thumbnailCID,
      UploadedDate: Date.now(),
    };
    // Calling the saveVideo function and passing the metadata object
    console.log("data: ", data);
    await saveVideo(data);
    setLoading(false);
    alert("Upload successfully. It will take a few minutes to store and process. Stay tuned.")
  };

  // Function to upload the video to IPFS
  const uploadThumbnail = async () => {
    // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail);
    // Returning the CID
    return cid;
  };

  // Function to upload the video to web3storage
  const uploadVideo = async () => {
    const id = await saveToIPFS(video);
    return id;
  };

  // Function to save the video to the Contract
  const saveVideo = async (data = uploadData) => {
    // Get the contract from the getContract function
    let contract = getContract();
    // Upload the video to the contract

    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.category,
      data.thumbnail,
      data.UploadedDate
    );
  };

  return (
    <Background>
        <div className="flex h-full w-full flex-row z-0">
          {/* <Sidebar /> */}
          <div className="flex flex-1 flex-col">
            <Header />
            <div className="mt-5 mr-10 flex justify-end">
              <div className="flex items-center">
                <button
                  className="mr-6 rounded-lg border border-gray-600 bg-transparent py-2  px-6  dark:text-[#9CA3AF]"
                  onClick={() => {
                    goBack();
                  }}
                >
                  Discard
                </button>
                {loading ? (
                  <button disabled="" type="button" className="flex-row justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex flex-row items-center  justify-between  rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                  >
                    <BiCloud />
                    <p className="ml-2">Upload</p>
                  </button>
                )}
              </div>
            </div>
            <div className="m-10 mt-5 flex 	flex-col  lg:flex-row">
              <div className="flex flex-col lg:w-3/4 ">
                <label className="text-sm text-gray-600  dark:text-[#9CA3AF]">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Tuyển tập nhạc thiếu nhi bé Xuân Mai hay nhất"
                  className="border-borderWhiteGray mt-2  h-12  w-[90%] rounded-md border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                />
                <label className="mt-10 text-sm text-gray-600 dark:text-[#9CA3AF]">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Trương Hoàng Xuân Mai, thường được biết đến với nghệ danh Xuân Mai, 
                  là một nữ ca sĩ kiêm diễn viên truyền hình người Việt Nam. 
                  Cô bước chân vào lĩnh vực ca hát từ khi còn rất nhỏ, 
                  năm 2 tuổi cô đã đi biểu diễn và bán khá chạy với loạt album 
                  & liveshow đầu tay 'Con cò bé bé' dưới định dạng VCD"
                  className="border-borderWhiteGray mt-2  h-32 w-[90%] rounded-md  border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                />

                <div className="mt-10 flex w-[90%] flex-row  justify-between">
                  <div className="flex w-2/5 flex-col	">
                    <label className="text-sm text-gray-600  dark:text-[#9CA3AF]">
                      Category
                    </label>
                    <select
                      value={category ? category : "Music"}
                      onChange={(e) => setCategory(e.target.value)}
                      className=" border-borderWhiteGray mt-2 h-12  rounded-md border bg-transparent p-2 focus:outline-none dark:border-gray-600  dark:text-white dark:bg-background-dark hover:cursor-pointer"
                    >
                      <option>Music</option>
                      <option>Sports</option>
                      <option>Gaming</option>
                      <option>News</option>
                      <option>Entertainment</option>
                      <option>Education</option>
                      <option>Science & Technology</option>
                      <option>Travel</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <label className="mt-10 text-sm  text-gray-600 dark:text-[#9CA3AF]">
                  Thumbnail
                </label>

                <div
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  className="border-borderWhiteGray mt-2 flex  h-36 w-64 items-center justify-center rounded-md  border-2 border-dashed p-2 dark:border-gray-600 hover:cursor-pointer"
                >
                  {thumbnail ? (
                    <img
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                      src={URL.createObjectURL(thumbnail)}
                      alt="thumbnail"
                      className="h-full rounded-md"
                    />
                  ) : (
                    <BiPlus size={40} color="gray" />
                  )}
                </div>

                <input
                  type="file"
                  className="hidden"
                  ref={thumbnailRef}
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                />
              </div>

              <div
                onClick={() => {
                  console.log("current video: ", videoRef.current.value);
                  videoRef.current.click();
                }}
                className={
                  videoData
                    ? " w-96   rounded-md  h-64 items-center justify-center flex hover:cursor-pointer"
                    : "border-2 dark:border-gray-600 w-96 border-dashed border-borderWhiteGray rounded-md mt-8 h-64 items-center justify-center flex hover:cursor-pointer"
                }
              >
                {videoData ? (
                  <>
                    <video
                      controls
                      src={videoData}
                      className="h-full rounded-md"
                    />
                  </>
                ) : (
                  <p className="dark:text-[#9CA3AF]">Upload</p>
                )}
                <input
                  type="file"
                  className="hidden"
                  ref={videoRef}
                  accept={"video/*"}
                  onChange={(e) => {
                    setVideo(e.target.files[0]);
                    setVideoData(URL.createObjectURL(e.target.files[0]));
                    console.log(e.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
    </Background>
  );
}
// const Loader = () => {
//   return (
//     <div className="flex justify-center items-center h-screen z-10 bg-gradient-to-r from-blue-500">
//       <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
//       </div>
//     </div>
//   );
// };
