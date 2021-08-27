import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';

import { useEffect, useState } from 'react';

const getTypoFrom = (originalText) => {
  // ここの実装をしていくことになる
  const typoText = originalText;
  return typoText;
};

const tweet = (text) => {
  if (text == "") return;
  const tweetHost = 'https://twitter.com/intent/tweet';
  const url = 'https://google.com';
  const hashtags = ['Tiwtter', 'Typo'];
  const typoText = getTypoFrom(text);
  window.location = `${tweetHost}?text=${typoText}&url=${url}&hashtags=${hashtags.join(',')}`;
};

const TweetForm = ({
  userName,
  userId,
  imgSrc,
}) => {
  const [text, setText] = useState("");
  return (
    <>
      <Box>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={imgSrc} width="40"/>
            </Avatar>
          }
          title={userName}
          subheader={"@" + userId}
          className="user-info"
        />
        <CardContent>
          <textarea
            className="textarea"
            placeholder="いまどういｓてる？"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
          />
        </CardContent>
      </Box>
      <Box pb={1} style={{textAlign: "right"}}>
        <Fab
          variant="extended"
          color="primary"
          style={{
            backgroundColor: '#3CA1F2',
            fontWeight: 'bold',
          }}
          onClick={() => {tweet(text)}}
        >
          ツイートする
        </Fab>
      </Box>
    </>
  );
};

export default TweetForm;