import { useRouter } from "next/router";
import { Header, Sidebar } from "../../layout";
import React, { useEffect, useState } from "react";
import {
  Background,
  VideoPlayer,
  Video as RelatedVideos,
} from "../../components";
import ApolloClient from "../../clients/apollo";
import { GET_ALL_VIDEOS } from "../../queries";
import Link from "next/link";
import moment from "moment";
import { BiCheck } from "react-icons/bi";
import Avvvatars from "avvvatars-react";
import { IVideo } from "../../types";
import { log } from "@graphprotocol/graph-ts";

export default function Video() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<IVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<IVideo[]>([]);

  const fetchVideos = () => {
    ApolloClient.query({
      query: GET_ALL_VIDEOS,
      variables: {
        first: 20,
        skip: 0,
        orderBy: "createdOn",
        orderDirection: "desc",
        where: {},
      },
      fetchPolicy: "network-only",
    })
      .then(({ data }) => {
        console.log(data);
        setRelatedVideos(data.videoUploadeds.filter((v) => v.id !== id));
        const video = data.videoUploadeds.find((v) => v.id === id);
        setVideo(video);
        console.log("videos", data.videoUploadeds);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, [id]);

  return (
    <Background className="flex  h-full w-full flex-row">
      {/* <Sidebar /> */}
      <div className="flex flex-1 flex-col">
      <Header />
        {video && (
          <div className="mt-5 flex flex-col justify-between lg:flex-row lg:justify-center space-x-10">
            <div className="w-6/6 lg:w-3/6">
              <VideoPlayer id={video.videoHash} />
              <div className="border-border-light dark:border-border-dark flex flex-row justify-between border-b-2 py-4">
                <div>
                  <h3 className="text-transform: text-2xl capitalize dark:text-white">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-gray-500 ">
                    {video.category} •{" "}
                    {moment(new Date(video.createdOn * 1)).fromNow()}
                  </p>
                </div>
              </div>
              <div>
                <div className="mt-5 flex flex-row items-center ">
                  <div className="w-12">
                    <Avvvatars value={video.creator.slice(2)} size={50} />
                  </div>
                  <div className="ml-3 flex flex-col">
                    <p className="text-md mt-1 flex items-center text-black dark:text-white">
                      {video.creator.slice(0, 4)}...{video.creator.slice(-4)}{" "}
                      <BiCheck size="20px" className="fill-gray ml-1" />
                    </p>
                    <p className="text-subtitle-light flex items-center text-sm ">
                      Video by {video.creator}
                    </p>
                  </div>
                </div>
                <p className="text-text-light dark:text-text-dark text-textSubTitle mt-4 ml-16 text-sm">
                  {video.description}
                </p>
              </div>
            </div>
            <div className="w-2/6">
              <h4 className="text-md ml-5 mb-3 font-bold text-black dark:text-white">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <Link href={`/video/${video.id}`} key={video.id}>
                  <RelatedVideos video={video} horizontal={true} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Background>
  );
}
