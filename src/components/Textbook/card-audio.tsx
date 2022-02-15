import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export default function CardAudio(audio:string, size: string, style?: object, play?: boolean) {
  useEffect(() => {
    if (play === true) {
      if (audio) {
        const audioN: HTMLAudioElement = new Audio();
        audioN.src = `https://react-rslang-str.herokuapp.com/${audio}`;
        setTimeout(() => {
          audioN.autoplay = true;
          audioN.load();
        }, 300);
      }
    }
  }, [audio, play]);

  return (
    <IconButton
      sx={style}
      onClick={() => {
        const audioN: HTMLAudioElement = new Audio();
        audioN.src = `https://react-rslang-str.herokuapp.com/${audio}`;
        audioN.play();
      }}
    >
      <PlayArrowRounded
        sx={{ fontSize: size }}
      />

    </IconButton>
  );
}
