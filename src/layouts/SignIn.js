import React from 'react';
import {Link, Grid, Box, Avatar, CssBaseline, TextField, Button, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import bgImg from "assets/img/cover.jpg";
import Axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Iot Solution 2 team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop : theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [id, setId] = React.useState('');

  const handleChangeId = event => {
      setId(event.target.value);
  };

  const [pw, setPw] = React.useState('');

  const handleChangePw = event => {
      setPw(event.target.value);
  };

  function handleClick(e) {
    e.preventDefault();
    Axios.post('/users/login', {
      "user_id" : {id}.id,
      "user_pw" : {pw}.pw
    }).then( respose => {
      if(respose.data.user_idx != null){
          alert("로그인 성공");
          window.location.href = "/home";
      }else {
        alert("로그인 실패! 아이디나 비밀번호 또는 승인상태를 확인해주세요.");
      }
    }).catch( error => {
      alert("로그인 실패! 아이디나 비밀번호 또는 승인상태를 확인해주세요.");
    })
  }

  return (
    <div className={classes.wrapper} style={{backgroundImage: `url(${bgImg})`, backgroundSize:"cover"}}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={id}
            onChange={handleChangeId}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="id"
            autoFocus
          />
          <TextField
            value={pw}
            onChange={handleChangePw}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="비밀번호"
            type="pw"
            id="pw"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            style={{marginTop:"2rem"}}
            type="submit"
            href="#"
            onClick = {handleClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item xs/>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
   </div>
  );
}