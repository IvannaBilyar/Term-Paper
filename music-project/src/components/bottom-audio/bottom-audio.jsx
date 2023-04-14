import { useEffect, useRef, useState } from "react";

import "./bottom-audio.css";
import { useSong } from "../../utils/song-context";

import CircledPlay from "../../assets/circled-play.svg";
import AudioEnd from "../../assets/end.svg";
import AudioRepeat from "../../assets/repeat.svg";
import AudioSkipToStart from "../../assets/skip-to-start.svg";
import AudioShuffle from "../../assets/shuffle.svg";
import PauseButton from "../../assets/pause-button.svg";

import Seeker from "./seeker";
import Audio from "./audio-track";
import Volume from "./volume";
import { shuffleArray } from "../../utils/convert";

const BottomAudio = () => {
  const { selectedSong, onSelect, onSetList, list, initList } = useSong();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);

  const currentSongIndex = selectedSong
    ? list.findIndex((item) => item.key === selectedSong.key)
    : undefined;

  const handlePrev = () => {
    if (currentSongIndex !== undefined && currentSongIndex !== 0) {
      onSelect(list[currentSongIndex - 1]);
    }
  };

  const handleNext = () => {
    if (
      currentSongIndex !== undefined &&
      currentSongIndex !== list.length - 1
    ) {
      onSelect(list[currentSongIndex + 1]);
    }
  };

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      if (selectedSong.key) {
        audioRef.current.src = require(`../../assets/audio/${selectedSong.key}.mp3`);
      } else {
        audioRef.current = null;
      }
    }
  }, [selectedSong]);

  const handleTrackClick = (position) => {
    audioRef.current.currentTime = position;
  };

  useEffect(() => {
    if (selectedSong) {
      if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying, selectedSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    isPlaying ? handlePause() : handlePlay();
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleShuffle = () => {
    if (isShuffled) {
      onSetList(initList);
      setIsShuffled(false);
    } else {
      onSetList(shuffleArray(list));
      setIsShuffled(true);
    }
  };

  const handleRepeat = () => {
    setIsRepeated((prevRepeated) => !prevRepeated);
  };

  const handleSetVolume = (e) => {
    const volume = e.target.value;
    setVolume(parseFloat(volume));
  };

  const handlePlayTheSame = () => {
    audioRef.current.play();
  };

  const track = selectedSong?.key
    ? require(`../../assets/audio/${selectedSong.key}.mp3`)
    : undefined;

  return (
    selectedSong && (
      <div className="bottom-audio-root">
        <div className="selected-audio-info-wrapper">
          <img
            src={selectedSong.img}
            alt="song"
            className="selected-audio-img"
          />
          <div>
            <p className="selected-audio-name">{selectedSong.name}</p>
            <p className="selected-audio-singer">{selectedSong.singer}</p>
          </div>
        </div>
        {track && (
          <div className="selected-audio-centred-block">
            <div className="selected-audio-buttons">
              <div
                className="random-track"
                onClick={handleShuffle}
                style={{ opacity: isShuffled ? 1 : 0.6 }}
              >
                <img src={AudioShuffle} alt="shuffle" />
              </div>
              <div
                className="prev-track"
                onClick={handlePrev}
                style={{
                  opacity: currentSongIndex !== 0 ? 1 : 0.6,
                }}
                disabled={currentSongIndex === 0}
              >
                <img src={AudioSkipToStart} alt="prev" />
              </div>
              <div className="playpause-track" onClick={handlePlayPause}>
                <img src={isPlaying ? PauseButton : CircledPlay} alt="play" />
              </div>
              <div
                className="next-track"
                onClick={handleNext}
                style={{
                  opacity: currentSongIndex !== list.length - 1 ? 1 : 0.6,
                }}
                disabled={currentSongIndex === list.length - 1}
              >
                <img src={AudioEnd} alt="next" />
              </div>
              <div
                className="repeat-track"
                onClick={handleRepeat}
                style={{ opacity: isRepeated ? 1 : 0.6 }}
              >
                <img src={AudioRepeat} alt="repeat" />
              </div>
            </div>

            <Seeker
              onChange={handleTrackClick}
              duration={duration}
              currentTime={currentTime}
            />

            <Audio
              track={track}
              ref={audioRef}
              handleDuration={setDuration}
              handleCurrentTime={setCurrentTime}
              onEnded={isRepeated ? handlePlayTheSame : handleNext}
            />
          </div>
        )}
        <Volume volume={volume} setVolume={handleSetVolume} />
      </div>
    )
  );
};

export default BottomAudio;
