import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { TextField, Button, Select, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormHelperText
  , MenuItem, InputLabel, } from '@material-ui/core';

import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const [gender, setGender] = React.useState('');
  const [id,setId] = React.useState('');
  const [pw,setPw] = React.useState('');
  const [name,setName] = React.useState('');
  const [phone,setPhone] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [team,setTeam] = React.useState('');

  const handleChange = e => { setGender(e.target.value); };
  const handleChangeId = e => { setId(e.target.value) };
  const handleChangePw = e => { setPw(e.target.value) };
  const handleChangeName = e => { setName(e.target.value) };
  const handleChangePhone = e => { setPhone(e.target.value) };
  const handleChangeEmail = e => { setEmail(e.target.value) };
  const handleChangeTeam = e => { setTeam(e.target.value) };
  
  const handleOnClick = e => {
    e.preventDefault();
    axios.patch('/users/', {
      "user_id" : {id}.id,
      "user_pw" : {pw}.pw,
      "user_name" : {name}.name,
      "user_email" : {email}.email,
      "user_phone" : {phone}.phone,
      "user_team" : {team}.team,
      "user_gender" : {gender}.gender
    }).then( respose => {
      console.log(respose.data);
      if(respose.data > 0){
          alert("회원가입 성공");
          window.location.href = "/signin";
      }
    }).catch( error => {
      console.log("회원가입 실패");
    })
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={6} sm={6} md={3}>
                    <TextField
                        value={id}
                        onChange={handleChangeId}
                        margin="normal"
                        fullWidth
                        id="id"
                        label="아이디"
                        name="id"
                        autoComplete="id"
                    />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                    <TextField
                        value={pw}
                        onChange={handleChangePw}
                        margin="normal"
                        fullWidth
                        id="pw"
                        label="비밀번호"
                        name="pw"
                        autoComplete="pw"
                    />
                </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={4} sm={4} md={2}>
                    <TextField
                        value={name}
                        onChange={handleChangeName} 
                        margin="normal"
                        fullWidth
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                    />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                      <TextField
                          value={phone}
                          onChange={handleChangePhone}
                          margin="normal"
                          required
                          fullWidth
                          id="phone"
                          label="핸드폰 번호"
                          name="phone"
                          autoComplete="phone"
                      />
                </GridItem>
                <GridItem xs={8} sm={8} md={4}>
                    <TextField
                        value={email}
                        onChange={handleChangeEmail}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                    />
                </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={6} sm={6} md={3}>
                      <FormControl className={classes.formControl} style={{marginTop : "35px"}}>
                          <InputLabel id="select-label">소속</InputLabel>
                          <Select
                          labelid="select-label"
                          id="simple-select"
                          value={team}
                          onChange={handleChangeTeam}
                          >
                          <MenuItem value={"IOT SOLUTION 1 TEAM"}>IOT 솔루션 1팀</MenuItem>
                          <MenuItem value={"IOT SOLUTION 2 TEAM"}>IOT 솔루션 2팀</MenuItem>
                          </Select>
                          <FormHelperText>근무하고 있는 팀을 선택해주세요</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                      <FormControl component="fieldset" style={{marginTop : "35px"}}>
                          <FormLabel component="legend" style={{display:"inline", marginBottom:"15px"}}>성별</FormLabel>
                          <RadioGroup row aria-label="position" name="position" defaultValue="top" value={gender} onChange={handleChange}>
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
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button style={{backgroundColor:"#9c27b0", color:"white"}} color="primary" onClick={handleOnClick}>프로필 수정</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
