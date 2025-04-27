import React from "react";
import styled from "styled-components";

const VideoModal = ({ videoUrl, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <PlayerWrapper onClick={(e) => e.stopPropagation()}>
        <video controls autoPlay src={videoUrl} />
      </PlayerWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const PlayerWrapper = styled.div`
  width: 80%;
  max-width: 900px;

  video {
    width: 100%;
    border-radius: 10px;
  }
`;

export default VideoModal;
