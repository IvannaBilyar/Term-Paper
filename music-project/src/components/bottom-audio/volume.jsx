import AudioVolume from "../../assets/audio.svg";

function Volume({ volume, setVolume }) {
  const percentage = ((volume - 0.01) / 0.99) * 100;

  const inlineStyle = {
    backgroundImage: `-webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(${percentage}%, #C593ED),
      color-stop(${percentage}%, #e1d8e9)
    )`,
  };
  return (
    <div className="volume-slider-container">
      <img src={AudioVolume} alt="volume" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className="volume-slider"
        onChange={setVolume}
        style={inlineStyle}
      />
    </div>
  );
}
export default Volume;
