import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';

import { loginTwitter } from '../api/TwitterAuth';

const LoginButton = ({
  loginMsg,
}) => {
  return (
    <Fab
      variant="extended"
      color="primary"
      style={{
        backgroundColor: '#3CA1F2',
        fontWeight: 'bold',
      }}
      onClick={loginTwitter}
    >
      {loginMsg}
    </Fab>
  );
};

export default LoginButton;