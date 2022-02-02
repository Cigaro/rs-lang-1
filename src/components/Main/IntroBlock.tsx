import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import mainImg from '../../assets/main-pic1.png';

export default function IntroBlock() {
  return (
    <Container
      maxWidth="xl"
      className="main__intro"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <h1 className="main__heading">RS Lang</h1>
        <p className="main__desc">Learning English has never been so easy</p>
        <Link to="/textbook" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: 'white',
              marginTop: '50px',
            }}
          >
            Let&apos;s start
          </Button>
        </Link>
      </Box>
      <img src={mainImg} alt="" className="main__img" />
    </Container>
  );
}
