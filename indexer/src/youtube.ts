import { VideoUploaded as VideoUploadedEvent } from "../generated/Youtube/Youtube"
import { VideoUploaded } from "../generated/schema"

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  let entity = new VideoUploaded(event.params.id.toString())
  entity.videoHash = event.params.videoHash
  entity.title = event.params.title
  entity.description = event.params.description
  entity.category = event.params.category
  entity.thumbnailHash = event.params.thumbnailHash
  entity.creator = event.params.creator
  entity.createdOn = event.params.createdOn
  entity.save()
}
