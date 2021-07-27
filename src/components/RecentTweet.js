import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const RecentTweet = ({
  userName,
  userId,
  imgSrc,
  content,
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
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            {content}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
};

export default RecentTweet;