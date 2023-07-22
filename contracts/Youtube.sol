// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Youtube {
    uint public numOfVideo = 0;
    struct Video {
        uint id;
        string videoHash;
        string title;
        string description;
        string category;
        string thumbnailHash;
        uint createdOn;
        address creator;
    }

    mapping(uint => Video) public videos;
    event VideoUploaded(uint id, string videoHash, string title, string description, string category, string thumbnailHash, uint createdOn, address creator);

    function uploadVideo(string memory videoHash, string memory title, string memory description, string memory category, string memory thumbnailHash, uint createdOn) public {
        numOfVideo++;
        videos[numOfVideo] = Video(numOfVideo, videoHash, title, description, category, thumbnailHash, createdOn, msg.sender);
        emit VideoUploaded(numOfVideo, videoHash, title, description, category, thumbnailHash, createdOn, msg.sender);
    }
}