import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsPauseCircle } from "react-icons/bs";

export function AudioPlayer(props) {
    const audioRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const playAudio = () => {
        if (isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlay(!isPlay);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", () => {
                setCurrentTime(audioRef.current.currentTime);
                if (audioRef.current.currentTime >= audioRef.current.duration) {
                    setIsPlay(false);
                    setCurrentTime(0);
                }
            });
            audioRef.current.addEventListener("loadedmetadata", () => {
                setAudioDuration(audioRef.current.duration);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", () => {});
                audioRef.current.removeEventListener("loadedmetadata", () => {});
            }
        };
    }, [audioRef.current]);
console.log(audioDuration , 'audioDuration')
    return (
        <div htmlFor="audio-file" className="flex items-center gap-2">
            <button onClick={playAudio}>
                {isPlay ? (
                    <BsPauseCircle
                        style={{ color: props?.color ?? "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }}
                    />
                ) : (
                    <BsFillPlayFill
                        style={{ color: props?.color ?? "#ff1d4e", cursor: "pointer", fontSize: "1.2rem", fontFamily: "regular" }}
                    />
                )}
            </button>
            <audio ref={audioRef} controls id="audio-file" style={{ display: "none", width: "100%" }}>
                <source src={`data:audio/wav;base64,${props?.audioBlob}`} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
            <div>{formatTime(audioDuration !== Infinity ? audioDuration : currentTime)}</div>
        </div>
    );
}

AudioPlayer.propTypes = {
    audioBlob: PropTypes.string,
    color: PropTypes.string,
    updateTime: PropTypes.func,
    currentTime: PropTypes.string,
    is_record: PropTypes.bool,
};
