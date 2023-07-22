import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { VideoUploaded } from "../generated/Youtube/Youtube"

export function createVideoUploadedEvent(
  id: BigInt,
  videoHash: string,
  title: string,
  description: string,
  category: string,
  thumbnailHash: string,
  createdOn: string,
  creator: Address
): VideoUploaded {
  let videoUploadedEvent = changetype<VideoUploaded>(newMockEvent())

  videoUploadedEvent.parameters = new Array()

  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("videoHash", ethereum.Value.fromString(videoHash))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "thumbnailHash",
      ethereum.Value.fromString(thumbnailHash)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("createdOn", ethereum.Value.fromString(createdOn))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return videoUploadedEvent
}
