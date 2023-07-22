import { gql } from "@apollo/client";

export const GET_ALL_VIDEOS = gql`
  query videoUploadeds(
    $first: Int
    $skip: Int
    $orderBy: VideoUploaded_orderBy
    $orderDirection: OrderDirection
    $where: VideoUploaded_filter
  ) {
    videoUploadeds(
      first: $first
      skip: $skip
      orderDirection: $orderDirection
      orderBy: $orderBy
      where: $where
    ) {
      id
      videoHash
      title
      description
      category
      thumbnailHash
      creator
      createdOn
    }
  }
`;

export const GET_VIDEO_BY_ID = gql`
  query videoUploaded($id: ID!) {
    videoUploaded(id: $id) {
      id
      videoHash
      title
    }
  }
`;
