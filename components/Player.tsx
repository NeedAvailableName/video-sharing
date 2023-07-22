import React, { useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { GET_VIDEO_BY_ID } from "../queries";
import ApolloClient from "../clients/apollo";
import { IVideo } from "../types";
import getDataFromIPFS from "../lib/getData";
import { useRouter } from "next/router";

interface PlayerProps {
  id: any;
}
const VideoPlayer: React.FC<PlayerProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<IVideo | null>(null);
  ApolloClient.query({
    query: GET_VIDEO_BY_ID,
    variables: { id },
    fetchPolicy: "network-only",
  })
    .then(({ data }) => {
      setVideo(data?.videoUploaded);
      console.log(getDataFromIPFS(video?.videoHash));
    })
    .catch((err) => {
      console.log("err", err);
    });
  return (
    <Plyr
      source={{
        type: "video",
        title: video?.title,
        sources: [
          {
            src: getDataFromIPFS(video?.videoHash),
            type: "video/mp4",
          },
        ],
      }}
      options={{
        autoplay: true,
      }}
      autoPlay={true}
    />
  );
};

export default VideoPlayer;
