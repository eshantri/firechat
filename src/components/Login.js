import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase";
import "firebase/app";
import firebase from "firebase/app";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      width: "60vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      width: "35vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25vw",
    },
  },
  typography: {
    marginBottom: theme.spacing(5),
  },
}));
const Login = () => {
  const classes = useStyles();
  return (
    <div className="login-container">
      <Typography className={classes.typography} variant="h3" component="h3">
        Welcome to FireChat!
      </Typography>
      <Button
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        }
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<GoogleOutlined />}
      >
        Sign Up with Google
      </Button>
      <br />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<FacebookOutlined />}
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        }
      >
        Sign Up with Facebook
      </Button>
    </div>
  );
};
export default Login;
