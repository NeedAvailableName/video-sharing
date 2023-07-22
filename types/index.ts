// Types for Videos

export interface IVideo {
  id: string;
  videoHash: string;
  title: string;
  description: string;
  category: string;
  thumbnailHash: string;
  creator: string;
  createdOn: BigInt;
}
