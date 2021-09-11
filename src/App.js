import './App.css';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TweetForm from './components/TweetForm';
import RecentTweet from './components/RecentTweet';
import { useEffect, useState } from 'react';

import axios from 'axios';

import default_profile_img from './default_profile.png';


function App() {
  const [recentPosts, setResentPosts] = useState([]);

  useEffect(() => {
    // 自前のTwitter Serverから最近の投稿を取得
    axios.get(process.env.REACT_APP_TWITTER_API_HOST + "/search", {
      params: {
        q: '#Tiwtter',
      }
    }).then(res => {
      setResentPosts(res.data.filter(post => {
        if (!(post.text[0] === 'R' && post.text[1] === 'T')) {
          return post;
        }
      }).slice(0, 3));
      // console.log(res.data);
    })
  }, []);

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
          userName={"Let's Typo"}
          userId={'typooo'}
          imgSrc={default_profile_img}
        />
        {
          recentPosts.map((post, i) => {
            return (
            <RecentTweet
              userName={post.name}
              userId={post.screen_name}
              imgSrc={post.profile_image_url_https}
              text={post.text}
              key={i}
            />
            );
          })
        }
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
