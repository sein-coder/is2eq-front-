import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, TextField, Button, Select, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText
  , MenuItem, InputLabel, } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import bgImg from 'assets/img/cover.jpeg';

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
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [gender, setGender] = React.useState('');

  const handleChange = event => {
      setGender(event.target.value);
  };

  return (
    <div className={classes.wrapper} style={{backgroundImage: `url(${bgImg})`, backgroundSize:"cover"}}>
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper} spacing={1}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
              <Grid container>
                  <Grid item xs={6}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="id"
                          label="아이디"
                          name="id"
                          autoComplete="id"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="pw"
                          label="비밀번호"
                          name="pw"
                          autoComplete="pw"
                      />
                  </Grid>
                  <Grid item xs={8}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="name"
                          label="이름"
                          name="name"
                          autoComplete="name"
                      />
                  </Grid>
                  <Grid item xs={8}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="이메일 주소"
                          name="email"
                          autoComplete="email"
                      />
                  </Grid>
                  <Grid item xs={8}>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
                          label="핸드폰 번호"
                          name="phone"
                          autoComplete="phone"
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="select-label">소속</InputLabel>
                          <Select
                          labelid="select-label"
                          id="simple-select"
                          value={gender}
                          onChange={handleChange}
                          >
                          <MenuItem value="">
                              <em>없음</em>
                          </MenuItem>
                          <MenuItem value={"IOT SOLUTION 1 TEAM"}>IOT 솔루션 1팀</MenuItem>
                          <MenuItem value={"IOT SOLUTION 2 TEAM"}>IOT 솔루션 2팀</MenuItem>
                          </Select>
                          <FormHelperText>근무하고 있는 팀을 선택해주세요</FormHelperText>
                      </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                      <FormControl component="fieldset">
                          <FormLabel component="legend" style={{display:"inline", marginBottom:"15px"}}>성별</FormLabel>
                          <RadioGroup row aria-label="position" name="position" defaultValue="top">
                              <FormControlLabel
                              value="m"
                              control={<Radio color="primary" />}
                              label="남자"
                              labelPlacement="top"
                              />
                              <FormControlLabel
                              value="f"
                              control={<Radio color="primary" />}
                              label="여자"
                              labelPlacement="top"
                              />
                          </RadioGroup>
                      </FormControl>
                  </Grid>
              </Grid>
          </form>
          <Button
            type="submit"
            href="/signin"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}