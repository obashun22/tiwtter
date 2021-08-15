import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';

const TweetForm = ({
  userName,
  userId,
  imgSrc,
}) => {
  return (
    <>
      <Box>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={imgSrc}/>
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
            rows="3"
            style={{backgroundColor: ''}}
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
        >
          ツイートしる
        </Fab>
      </Box>
    </>
  );
};

export default TweetForm;