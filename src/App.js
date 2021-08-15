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
import LoginButton from './components/LoginButton';
import { useEffect, useState } from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
import 'firebase/analytics'

// Add the Firebase products that you want to use
import "firebase/auth";

import { loginTwitter, logoutTwitter } from './api/TwitterAuth';


// 上手く効かなかったのでmaterial-uiとcssで実装
// const useStyles = makeStyles((theme) => {
//   createStyles({
//   })
// });

// メモ
// ConsumerKeyはクライアント（コンシューマ）がプロバイダに承認をした際に取得する
// AccessTokenKeyは任意のユーザがAPIを使用するために使用するキー

// Twitter関連
// TL取得は自身のAccessTokenKeyで行う
// TweetはログインユーザのAccessTokenKeyで行う

function App() {
  // const classes = useStyles();
  const [recentPosts, setResentPosts] = useState(null);
  const [postForm, setPostForm] = useState(null);

  useEffect(() => {
    // Firebase認証
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyAKFz0-PKPcJNVY8N800pvzNrxcnp2X-PY",
      authDomain: "tiwtter-2b863.firebaseapp.com",
      projectId: "tiwtter-2b863",
      storageBucket: "tiwtter-2b863.appspot.com",
      messagingSenderId: "212533003120",
      appId: "1:212533003120:web:090141b8c54841db2485b5",
      measurementId: "G-6K1XBVYVE0"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    }
    // Fetch Recent Tweet
    
    // Set Tweet Form
    // ログイン状態の確認処理
    const unsubscribed = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログインしている場合
        setPostForm(
          <TweetForm
            userName={user.displayName}
            userId={user.providerId}
            imgSrc={user.photoURL}
          />
        );
        console.log(user);
        console.log("ログイン...");
      } else {
        // ログインしてない場合
        setPostForm(
          <Box p={2}>
            <LoginButton
              loginMsg="ログインして始める"
            />
          </Box>
        );
        console.log("ログアウト...");
      }
    });
    // オブザーバの設定を解除
    return () => {
      unsubscribed();
    };
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
        <button onClick={logoutTwitter}>ろぐあうと</button>

        { postForm }

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
