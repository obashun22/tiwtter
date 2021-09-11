import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';

import { useEffect, useState } from 'react';

// 分かち書きするためのライブラリ
const TinySegmenter = require('tiny-segmenter');
const jaconv = require('jaconv');

// 与えた割合でtrueを返す
const boolByRate = (rate) => {
  if (Math.random() < rate) {
    return true;
  } else {
    return false;
  }
};

// 半角アルファベットを全角へ変換する
const convToFullWidth = (str) => {
  str = str.replace(/[A-Za-z0-9]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 65248);
  });
  return str;
};

// 半角アルファベット母音を日本語に変換
const convToJaVowel = (enVowel) => {
  let jaVowel = enVowel
    .replace(/[aA]/, 'あ')
    .replace(/[iI]/, 'い')
    .replace(/[uU]/, 'う')
    .replace(/[eE]/, 'え')
    .replace(/[oO]/, 'お');
  return jaVowel;
}

// 指定したIndexの文字とその次の文字を入れ替える
const swapNextChar = (str, index) => {
  // 文字列を再構成
  const firstHalf = str.slice(0, index);
  const swappedChars = str[index + 1] + str[index];
  const secondHalf = str.slice(index + 2);
  const swappedStr = firstHalf + swappedChars + secondHalf;
  return swappedStr;
};

// タイポした文字列を返す
const getTypoFrom = (originalText) => {
  // 品詞ごとのタイポ
  const tinySegmenter = new TinySegmenter();
  let segments = tinySegmenter.segment(originalText);

  segments = segments.map((segment) => {
    if (segment.match(/[ぁ-ん]*$/) && boolByRate(0.05)) {
      // 末尾がひらがなの場合に末尾文字を子音のみにする Ex. たこやｋ
      const segmentBody = segment.slice(0, -1);
      const lastChar = segment.slice(-1);
      const upperLastChars = jaconv.toHebon(lastChar);
      // 最後の文字が母音ではない時に全角の子音のみに変換する
      // 'ゃ'をjaconv.toHebonで変換すると'ゃ'のままになるバグがあるので正規表現で対応
      if (!upperLastChars.match(/^[aiueoAIUEO]$/) && upperLastChars.match(/^\w+$/)) {
        const upperLastConsonant = upperLastChars[0];
        const lowerLastConsonant = upperLastConsonant.toLowerCase();
        const fullWidthLowerLastConsonant = convToFullWidth(lowerLastConsonant);
        segment = segmentBody + fullWidthLowerLastConsonant;
      } else {
        segment = segmentBody + lastChar;
      }
    }

    // 末尾がひらがなの母音で終わる品詞に限定
    if (segment.match(/[ぁ-ぉあ-おー]+$/) && boolByRate(0.3)) {
      // 末尾を複製する Ex. たこやきき
      const lastChar = segment[segment.length - 1];
      segment = segment + lastChar;
    };

    // 末尾がひらがなで終わる品詞に限定
    if (segment.match(/[ぁ-んー]+$/) && segment.length > 1 && boolByRate(0.2)) {
      // 2文字以上で末尾削除 Ex. たこや
      segment = segment.slice(0, -1);
    };

    // ひらがなに限定
    if (segment.match(/^[ぁ-ん]+$/)) {
      // 4文字以上の両端以外で隣り合う2文字をランダムに入れ替え Ex. たやこき
      if (segment.length >= 4 && boolByRate(0.3)) {
        // 最初と最後、最後から2番目と3番目のIndex以外でランダムに選択
        const targetIndex = Math.floor(Math.random() * (segment.length - 3)) + 1;
        // IndexがtargetIndexの文字とその次の文字を入れ替える
        segment = swapNextChar(segment, targetIndex);
      }
    };

    // 全てひらがなの場合のみに限定
    if (segment.match(/^[ぁ-ん]+$/) && boolByRate(0.05)) {
      // 母音と子音を入れ替え Ex. たこあｙき
      const targetIndex = Math.floor(Math.random() * segment.length);
      const upperChars = jaconv.toHebon(segment[targetIndex]);
      // 子音 + 母音の構成になっている場合のみ入れ替え
      if (upperChars.length == 2) {
        const typodChars = convToJaVowel(upperChars[1]) + convToFullWidth(upperChars[0].toLowerCase());
        const segmentCharList = segment.split('');
        // IndexがtargetIndexの文字を破壊的に置き換え
        segmentCharList.splice(targetIndex, 1, typodChars);
        segment = segmentCharList.join('');
      }
    }

    // ー, ！, ？の文字列置き換え Ex. ！れ！！
    if (segment.match(/.*[ー！？].*$/)) {
      const charList = segment.split('');
      let typodCharList = charList.map((char) => {
        if (boolByRate(0.4)) {
          if (char == '！') {
            return 'れ';
          } else if (char == '？') {
            return 'る';
          } else if (char == 'ー') {
            return '＾';
          } else {
            return char;
          }
        } else {
          return char;
        }
      });
      segment = typodCharList.join("");
    };

    
    return segment;
  })

  // console.log("segments: " + segments);
  const typoText = segments.join("");
  
  return typoText;
};

// ツイート処理
const tweet = (text) => {
  if (text == "") return;
  const tweetHost = 'https://twitter.com/intent/tweet';
  const url = 'https://tiwtter.netlify.app/';
  const hashtags = [''];
  const typoText = getTypoFrom(text).replace('\n', '%0a') + "%0a%23Tiwtter から投稿しました%0a";
  const targetUrl = `${tweetHost}?text=${typoText}&url=${url}&hashtags=${hashtags.join(',')}`;
  window.location = targetUrl;
};

const TweetForm = ({
    userName,
    userId,
    imgSrc,
  }) => {
  const [text, setText] = useState("");
  // const [typoText, setTypoText] = useState("");
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
            onChange={(e) => {
              setText(e.target.value);
              // setTypoText(getTypoFrom(e.target.value));
            }}
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
          onClick={() => {
            tweet(text);
          }}
        >
          ツイートする
        </Fab>
      </Box>
      {/* {typoText} */}
    </>
  );
};

export default TweetForm;