import logo from './logo.svg';
import './App.css';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fab from '@material-ui/core/Fab';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TweetForm from './components/TweetForm';
import RecentTweet from './components/RecentTweet';

// 上手く効かなかったのでmaterial-uiとcssで実装
// const useStyles = makeStyles((theme) => {
//   createStyles({
//   })
// });

function App() {
  // const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="static" style={{backgroundColor: '#3CA1F2'}}>
        <Toolbar>
          <Typography variant="h6">
            Tiwtter
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box py={6} style={{backgroundColor: ''}}>
          <h1 className="catch-copy">時代はタイポ</h1>
        </Box>
        <TweetForm
          userName="おーば"
          userId="obashun22"
          imgSrc={logo}
        />
        <RecentTweet
          userName="おーば"
          userId="obashun22"
          imgSrc={logo}
          content={"はろーはろー"}
        />
        <RecentTweet
          userName="おーば"
          userId="obashun22"
          imgSrc={logo}
          content={"はろーはろー"}
        />
        <RecentTweet
          userName="おーば"
          userId="obashun22"
          imgSrc={logo}
          content={"はろーはろー"}
        />
      </Container>
      <Box py={4}>
        <Typography>
          ©2021 shunsuke oba
        </Typography>
      </Box>
    </div>
  );
}

export default App;
