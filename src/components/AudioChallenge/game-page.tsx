import { Box, Container, CircularProgress } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';
import { SinglWord } from '../interfaces/textbookI';
import AnswerVariant, { ResetData } from './answer-buttons';
import FillAnswerButtons from './fill-answer-buttons';
import { GameInterface } from '../interfaces/gameI';
import { RootState } from '../../redux/store';
import { getAllAggregatedWords } from '../../utils/gameUtils';

export const gameData: GameInterface = {
  correctAnswerInARow: 0,
  answer: false,
  correctAnswerCounter: 0,
  gameState: {
    correctWords: [],
    wrongWords: [],
    bestInARow: 0,
  },
  words: [],
};

export default function GamePage() {
  const [response, setResponse] = React.useState<Array<SinglWord>>([]);
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const params = useParams();
  const wordGroup = params.group;
  const wordPage = params.page;
  const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
  const { user } = useSelector((state: RootState) => state);
  useEffect(() => {
    if (user.name) {
      getAllAggregatedWords(user, {
        filter: `{"$and":[{"group":${wordGroup}}, {"page":${wordPage}}]}`,
        wordsPerPage: '20',
      }).then((res) => {
        let filtered = res[0].paginatedResults;
        if (location.pathname.includes('textbook')) {
          filtered = res[0].paginatedResults.filter((item) => !item.userWord?.optional.learned);
        }
        setResponse(filtered);
        console.log('filtered: ', filtered);
        setOpen(false);
        ResetData();
        FillAnswerButtons(filtered, 0);
      });
    } else {
      axios.get(apiUrl).then((resp) => resp.data).then((data:Array<SinglWord>) => {
        setResponse(data);
        setOpen(false);
        ResetData();
        FillAnswerButtons(data, 0);
      });
    }
  }, [apiUrl]);
  return (
    <Container
      maxWidth={false}
      className="main-game"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <Box>
        {AnswerVariant(response)}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
