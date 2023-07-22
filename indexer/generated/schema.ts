// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class VideoUploaded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save VideoUploaded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type VideoUploaded must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("VideoUploaded", id.toString(), this);
    }
  }

  static loadInBlock(id: string): VideoUploaded | null {
    return changetype<VideoUploaded | null>(
      store.get_in_block("VideoUploaded", id)
    );
  }

  static load(id: string): VideoUploaded | null {
    return changetype<VideoUploaded | null>(store.get("VideoUploaded", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get videoHash(): string {
    let value = this.get("videoHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set videoHash(value: string) {
    this.set("videoHash", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get category(): string {
    let value = this.get("category");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get thumbnailHash(): string {
    let value = this.get("thumbnailHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set thumbnailHash(value: string) {
    this.set("thumbnailHash", Value.fromString(value));
  }

  get createdOn(): BigInt {
    let value = this.get("createdOn");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set createdOn(value: BigInt) {
    this.set("createdOn", Value.fromBigInt(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }
}
