import Link from "next/link";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { IVideo } from "../types";
import moment from "moment";
import getDataFromIPFS from "../lib/getData";

interface IProps {
  video: IVideo;
  horizontal?: boolean;
}
function TruncatedString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }

  const truncated = str.slice(0, maxLength);
  return truncated + "...";
}

const Video: React.FC<IProps> = ({ video, horizontal }) => {
  const thumbnailUrl = getDataFromIPFS(video.thumbnailHash);

  return (
    <Link href={`/video/${video.id}`}>
      <div
        className={`${
          horizontal
            ? "flex flex-row ml-5 mb-5 items-center justify-center hover:cursor-pointer "
            : "flex flex-col m-5 w-80 hover:cursor-pointer"
        }`}
      >
        <div
          className={`${
            horizontal ? "w-60 pb-[30%] pl-[35%]" : "w-full pb-[56.25%]"
          } h-0 rounded-lg overflow-hidden relative`}
        >
          <img
            src={thumbnailUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className={horizontal ? "ml-3 w-80" : ""}>
          <h4 className="text-md font-bold dark:text-white text-black text-transform:capitalize">
            {TruncatedString(video.title, 30)}
          </h4>
          {horizontal && (
            <p className="text-sm flex items-center text-subtitle-light mt-1">
              {video.category} • {" "}
              {moment(new Date(video.createdOn * 1)).fromNow()}
            </p>
          )}
          <p className="text-sm flex items-center text-subtitle-light mt-1">
            {horizontal ? null : video.category + " • "}
            {video?.creator?.slice(0, 4) + "..." + video?.creator?.slice(-4)}
            <BiCheck size="20px" color="green" className="ml-1" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Video;
