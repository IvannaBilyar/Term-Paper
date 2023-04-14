import { convertTime } from "../../utils/convert";

const Seeker = ({ currentTime, duration, onChange }) => {
  const percentage = ((currentTime - 1) / (duration - 1)) * 100;

  const inlineStyle = {
    backgroundImage: `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(${percentage}%, #C593ED),
      color-stop(${percentage}%, #e1d8e9)
    )`,
  };

  const handleInputChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="audio-slider-container">
      <div className="current-time">{convertTime(currentTime)}</div>
      <input
        type="range"
        min="1"
        max={duration}
        value={currentTime}
        className="seek-slider"
        onChange={handleInputChange}
        style={inlineStyle}
      />
      <div className="total-duration">{convertTime(duration)}</div>
    </div>
  );
};

export default Seeker;
