import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const RecentTweet = ({
  userName,
  userId,
  imgSrc,
  text,
}) => {
  return (
    <>
      <Box mb={-1}>
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
          <Typography variant="body2" color="inherit" component="p" align="left" style={{whiteSpace: 'pre-line'}}>
            {text}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
};

export default RecentTweet;