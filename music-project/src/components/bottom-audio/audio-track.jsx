import { forwardRef } from "react";

const Audio = forwardRef(
  ({ track, handleDuration, handleCurrentTime, onEnded }, ref) => {
    return (
      <audio
        onEnded={onEnded}
        ref={ref}
        onLoadedMetadata={(e) => handleDuration(e.target.duration)}
        onTimeUpdate={(e) => handleCurrentTime(e.target.currentTime)}
      >
        <source src={track} type="audio/mpeg" />
      </audio>
    );
  }
);

export default Audio;
