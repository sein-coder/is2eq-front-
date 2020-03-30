import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import { Select, FormControl, FormHelperText, MenuItem, InputLabel, TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from "assets/css/customInputStyle.js";


import axios from 'axios';

const useStyles = makeStyles(styles);

export default function PcDetail() {
  const classes = useStyles();

  const [pc_ip, setPc_ip] = React.useState('');
  const [pc_id, setPc_id] = React.useState('');
  const [pc_pw, setPc_pw] = React.useState('');
  const [pc_external_ip, setPc_external_ip] = React.useState('');
  const [pc_s_n, setPc_s_n] = React.useState('');
  const [pc_open_port, setPc_open_port] = React.useState('');
  const [pc_os, setPc_os] = React.useState('');
  const [pc_hw, setPc_hw] = React.useState('');
  const [pc_dev_tb, setPc_dev_tb] = React.useState(8);
  const [pc_s_c, setPc_s_c] = React.useState(11);

  const handleChangeIp = e => {setPc_ip(e.target.value)};
  const handleChangeId = e => {setPc_id(e.target.value)};
  const handleChangePw = e => {setPc_pw(e.target.value)};
  const handleChangeExternalIp = e => {setPc_external_ip(e.target.value)};
  const handleChangeSN = e => {setPc_s_n(e.target.value)};
  const handleChangeOpenPort = e => {setPc_open_port(e.target.value)};
  const handleChangeOS = e => {setPc_os(e.target.value)};
  const handleChangeHW = e => {setPc_hw(e.target.value)};
  const handleChangeDEVTB = e => {setPc_dev_tb(e.target.value)};
  const handleChangeSC = e => {setPc_s_c(e.target.value)};

  const [location, setLocation] = React.useState(1);
  const [project, setProject] = React.useState(1);
  const [status, setStatus] = React.useState(1);
  const [possession, setPossession] = React.useState(5);
  const [equip_remarks, setRemarks] = React.useState('');
  const [owner_name, setOwner_name] = React.useState('');
  const [received_date, setReceivedDate] = React.useState(new Date());
  const [return_date, setReturnDate] = React.useState(new Date());

  const handleChangeLocation = e => { setLocation(e.target.value); };
  const handleChangeProject = e => { setProject(e.target.value); };
  const handleChangeStatus = e => { setStatus(e.target.value); };
  const handleChangePossession = e => { setPossession(e.target.value); };
  const handleChangeRemarks = e => {setRemarks(e.target.value)};
  const handleOwnerName = e => {setOwner_name(e.target.value)};
  const handleReceivedDate = date => {setReceivedDate(date)};
  const handleReturnDate = date => {setReturnDate(date)};


  const handleOnClick = (e) => {
    e.preventDefault();
    if({pc_ip}.pc_ip !== '' && {pc_id}.pc_id !== '' && {pc_pw}.pc_pw !== ''){
        axios.post('/equipments', {
            "category_idx" : 2,
            "location_idx" : {location}.location,
            "project_idx" : {project}.project,
            "equip_status" : {status}.status,
            "equip_possession" : {possession}.possession + 4,
            "equip_remarks" : {equip_remarks}.equip_remarks,
            "pc_ip" : {pc_ip}.pc_ip,
            "pc_id" : {pc_id}.pc_id,
            "pc_pw" : {pc_pw}.pc_pw,


            "owner_name" : {owner_name}.owner_name,
            "received_date" : {received_date}.received_date,
            "return_date" : {return_date}.return_date
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    } else {
        alert('필수 항목을 채워주세요');
    }
  }

  return (
    <div style={{paddingLeft:"100px", paddingRight:"100px"}}>
              <GridContainer>
                <GridItem xs={6} sm={6} md={2}>
                  <TextField
                    value = {pc_ip}
                    onChange = {handleChangeIp}
                    label="PC IP"
                    id="pc_ip"
                    fullWidth
                    margin="normal"
                    required
                    name="pc_ip"
                    autoComplete="pc_ip"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={2}>
                  <TextField
                    value = {pc_external_ip}
                    onChange = {handleChangeExternalIp}
                    label="PC 외부 IP"
                    id="pc_external_ip"
                    fullWidth
                    margin="normal"
                    name="pc_external_ip"
                    autoComplete="pc_external_ip"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {pc_id}
                    onChange = {handleChangeId}
                    label="PC 접속 ID"
                    id="pc_id"
                    fullWidth
                    margin="normal"
                    required
                    name="pc_id"
                    autoComplete="pc_id"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {pc_pw}
                    onChange = {handleChangePw}
                    label="PC PassWord"
                    id="pc_pw"
                    fullWidth
                    margin="normal"
                    required
                    name="pc_pw"
                    autoComplete="pc_pw"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}/>
                <GridItem xs={6} sm={6} md={3}>
                  <TextField
                    value = {pc_s_n}
                    onChange = {handleChangeSN}
                    label="PC 시리얼 넘버"
                    id="pc_s_n"
                    fullWidth
                    margin="normal"
                    name="pc_s_n"
                    autoComplete="pc_s_n"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <TextField
                    value = {pc_open_port}
                    onChange = {handleChangeOpenPort}
                    label="PC Open Port"
                    id="pc_open_port"
                    fullWidth
                    margin="normal"
                    name="pc_open_port"
                    autoComplete="pc_open_port"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                  <TextField
                    value = {pc_os}
                    onChange = {handleChangeOS}
                    label="PC OS"
                    id="pc_os"
                    fullWidth
                    margin="normal"
                    name="pc_os"
                    autoComplete="pc_os"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <TextField
                    value = {pc_hw}
                    onChange = {handleChangeHW}
                    label="PC H/W"
                    id="pc_hw"
                    fullWidth
                    margin="normal"
                    name="pc_hw"
                    autoComplete="pc_hw"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-devtb-label">장비 용도 분류(D/T)</InputLabel>
                          <Select
                          labelid="select-devtb-label"
                          id="devtb-select"
                          value={pc_dev_tb}
                          onChange={handleChangeDEVTB}
                          >
                          <MenuItem value={8} selected>미정</MenuItem>
                          <MenuItem value={9}>개발용</MenuItem>
                          <MenuItem value={10}>테스트 배드용</MenuItem>
                          </Select>
                          <FormHelperText>현재 장비 용도</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-sc-label">장비 용도 분류(S/C)</InputLabel>
                          <Select
                          labelid="select-sc-label"
                          id="sc-select"
                          value={pc_s_c}
                          onChange={handleChangeSC}
                          >
                          <MenuItem value={11} selected>미정</MenuItem>
                          <MenuItem value={12}>서버용</MenuItem>
                          <MenuItem value={13}>클라이언트용</MenuItem>
                          </Select>
                          <FormHelperText>현재 장비 용도</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}/>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-location-label">장소</InputLabel>
                          <Select
                          labelid="select-location-label"
                          id="location-select"
                          value={location}
                          onChange={handleChangeLocation}
                          >
                          <MenuItem value={1} selected>미확인</MenuItem>
                          <MenuItem value={2}>텔코웨어 1층</MenuItem>
                          <MenuItem value={3}>텔코웨어 2층</MenuItem>
                          <MenuItem value={4}>텔코웨어 3층</MenuItem>
                          <MenuItem value={5}>텔코웨어 4층</MenuItem>
                          <MenuItem value={6}>텔코웨어 5층</MenuItem>
                          <MenuItem value={7}>텔코웨어 옥상</MenuItem>
                          <MenuItem value={8}>외부</MenuItem>
                          </Select>
                          <FormHelperText>장비가 위치한 장소</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-project-label">프로젝트</InputLabel>
                          <Select
                          labelid="select-project-label"
                          id="project-select"
                          value={project}
                          onChange={handleChangeProject}
                          >
                          <MenuItem value={1} selected>LG VSass</MenuItem>
                          <MenuItem value={2}>TView</MenuItem>
                          <MenuItem value={3}>Ansan</MenuItem>
                          <MenuItem value={4}>GOP</MenuItem>
                          <MenuItem value={5}>EP</MenuItem>
                          <MenuItem value={6}>BS</MenuItem>
                          <MenuItem value={7}>BIS</MenuItem>
                          </Select>
                          <FormHelperText>주로 사용되는 프로젝트</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-status-label">장비 상태</InputLabel>
                          <Select
                          labelid="select-status-label"
                          id="status-select"
                          value={status}
                          onChange={handleChangeStatus}
                          >
                          <MenuItem value={1} selected>미정</MenuItem>
                          <MenuItem value={2}>비가용</MenuItem>
                          <MenuItem value={3}>사용중</MenuItem>
                          <MenuItem value={4}>사용예정</MenuItem>
                          </Select>
                          <FormHelperText>장비 사용 현황</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-possession-label">자산 소유</InputLabel>
                          <Select
                          labelid="select-possession-label"
                          id="possession-select"
                          value={possession}
                          onChange={handleChangePossession}
                          >
                          <MenuItem value={5} selected>미확인</MenuItem>
                          <MenuItem value={6} >소유</MenuItem>
                          <MenuItem value={7}>대여</MenuItem>
                          </Select>
                          <FormHelperText>장비 소유현황</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={8} sm={8} md={4}></GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField style={{marginTop : "35px"}}
                    value = {owner_name}
                    onChange = {handleOwnerName}
                    label="소유주 명"
                    id="owner_name"
                    fullWidth
                    margin="normal"
                    name="owner_name"
                    autoComplete="owner_name"
                  />
                </GridItem>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <GridItem xs={4} sm={4} md={2}>
                        <KeyboardDatePicker style={{marginTop : "35px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-received"
                            label="입고 날짜"
                            value={received_date}
                            onChange={handleReceivedDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </GridItem>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <GridItem xs={4} sm={4} md={2}>
                        <KeyboardDatePicker style={{marginTop : "35px"}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-return"
                            label="반납 날짜"
                            value={return_date}
                            onChange={handleReturnDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </GridItem>
                </MuiPickersUtilsProvider>

                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    value = {equip_remarks}
                    onChange = {handleChangeRemarks}
                    label="비고"
                    id="equip_remarks"
                    fullWidth
                    margin="normal"
                    name="equip_remarks"
                    autoComplete="equip_remarks"
                    multiline={true}
                    rows={5}
                  />
                </GridItem>

              </GridContainer>
              <Button style={{marginTop: "2rem"}} color="primary" onClick={handleOnClick}>정보 수정</Button>
              <Button style={{marginTop: "2rem", marginLeft : "2rem"}} color="primary" onClick={handleOnClick}>나가기</Button>
    </div>
  );
}
