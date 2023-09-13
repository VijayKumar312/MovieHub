import { useState } from 'react';
import { getAuth, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { app } from '../../firebase' 


export default function SignIn(props) {
    const [buttonState, setButtonState] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErr] = useState('')

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()
    const phoneNumber = 8919032908
    const appVerifier = window.recaptchaVerifier;

    const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr('')
    if(buttonState){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr(errorMessage)
            
          });
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/")
            console.log(user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr(errorMessage)
            
          });
    }
  };

  const onPhoneNumberSignIn = ()=>{
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      navigate("/")
    }).catch((error) => {
      console.log(error)
    });
  }
    

 const onGooglePopUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErr(errorMessage);
      });
  };

  const switchLogin=()=>{
    setButtonState(!buttonState)
    setEmail('')
    setPassword('')
    setErr('')
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box>
          <Typography component="h1" variant="h5">
            {buttonState ? 'Sign In' : 'Sign Up'}
          </Typography>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event)=>{setEmail(event.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>{setPassword(event.target.value)}}
            />
            {buttonState && (
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Box className="login-buttons">
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                onClick={handleSubmit}
                fullWidth
                >
                {buttonState ? 'Sign In' : 'Sign Up'}
                </Button>
                {/* <Button
                   type="submit"
                   variant="outlined"
                   sx={{ mt: 3, mb: 2 }}
                   onClick={onPhoneNumberSignIn}
                >{buttonState ? 'Login with Google': 'SingUp with Google'}</Button> */}
            </Box>
            
            <Typography style={{color: 'red', fontSize: '12px', marginBottom: '9px'}}>{errMsg}</Typography>
            <Grid container>
              {buttonState && (
                <Button onClick={onGooglePopUp} style={{fontSize:'10px'}}>
                  Login With Google
                </Button>
              )}
              <Grid item>
                {buttonState && (
                    <Button onClick={switchLogin} style={{fontSize: '10px'}}>
                          {"Don't have an account? Sign Up"}
                    </Button>
                )}
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
