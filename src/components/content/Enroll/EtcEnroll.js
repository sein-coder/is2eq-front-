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

export default function EtcEnroll() {
  const classes = useStyles();

  const [etc_ip, setEtc_ip] = React.useState('');
  const [etc_id, setEtc_id] = React.useState('');
  const [etc_pw, setEtc_pw] = React.useState('');
  const [etc_mac_addr, setEtc_mac_addr] = React.useState('');
  const [etc_brand, setEtc_brand] = React.useState('');
  const [etc_model_name, setEtc_model_name] = React.useState('');

  const handleChangeIp = e => {setEtc_ip(e.target.value)};
  const handleChangeId = e => {setEtc_id(e.target.value)};
  const handleChangePw = e => {setEtc_pw(e.target.value)};
  const handleChangeMac = e => {setEtc_mac_addr(e.target.value)};
  const handleChangeBrand = e => {setEtc_brand(e.target.value)};
  const handleChangeModelName = e => {setEtc_model_name(e.target.value)};

  const [location, setLocation] = React.useState(1);
  const [project, setProject] = React.useState(1);
  const [status, setStatus] = React.useState(1);
  const [possession, setPossession] = React.useState(5);
  const [equip_remarks, setRemarks] = React.useState('');
  const [owner_name, setOwner_name] = React.useState('');
  const [received_date, setReceivedDate] = React.useState(null);
  const [return_date, setReturnDate] = React.useState(null);

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
    if({etc_ip}.etc_ip !== '' && {etc_id}.etc_id !== '' && {etc_pw}.etc_pw !== ''){
        axios.post('/equipments', {
            "category_idx" : 3,
            "location_idx" : {location}.location,
            "project_idx" : {project}.project,
            "equip_status" : {status}.status,
            "equip_possession" : {possession}.possession + 4,
            "equip_remarks" : {equip_remarks}.equip_remarks,
            "etc_ip" : {etc_ip}.etc_ip,
            "etc_id" : {etc_id}.etc_id,
            "etc_pw" : {etc_pw}.etc_pw,
            "etc_mac_addr" : {etc_mac_addr}.etc_mac_addr,
            "etc_brand" : {etc_brand}.etc_brand,
            "etc_model_name" : {etc_model_name}.etc_model_name,
            "owner_name" : {owner_name}.owner_name,
            "received_date" : {received_date}.received_date,
            "return_date" : {return_date}.return_date
        }).then(response => {
          if(response.data > 0) {
            alert("등록 성공");
            window.location.reload();
          }else {
            alert("등록 실패");
          }
        }).catch(error => {
          alert("등록 실패");
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
                    value = {etc_ip}
                    onChange = {handleChangeIp}
                    label="기타 장비 IP"
                    id="etc_ip"
                    fullWidth
                    margin="normal"
                    required
                    name="etc_ip"
                    autoComplete="etc_ip"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {etc_id}
                    onChange = {handleChangeId}
                    label="기타 장비 접속 ID"
                    id="etc_id"
                    fullWidth
                    margin="normal"
                    required
                    name="etc_id"
                    autoComplete="etc_id"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {etc_pw}
                    onChange = {handleChangePw}
                    label="기타 장비 PassWord"
                    id="etc_pw"
                    fullWidth
                    margin="normal"
                    required
                    name="etc_pw"
                    autoComplete="etc_pw"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                  <TextField
                    value = {etc_mac_addr}
                    onChange = {handleChangeMac}
                    label="기타 장비 MAC 주소"
                    id="etc_mac_addr"
                    fullWidth
                    margin="normal"
                    name="etc_mac_addr"
                    autoComplete="etc_mac_addr"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {etc_brand}
                    onChange = {handleChangeBrand}
                    label="기타 장비 브랜드"
                    id="etc_brand"
                    fullWidth
                    margin="normal"
                    name="etc_brand"
                    autoComplete="etc_brand"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                 <TextField
                    value = {etc_model_name}
                    onChange = {handleChangeModelName}
                    label="기타 장비 모델 명"
                    id="etc_model_name"
                    fullWidth
                    margin="normal"
                    name="etc_model_name"
                    autoComplete="etc_model_name"
                  />
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
              <Button style={{marginTop: "2rem"}} color="primary" onClick={handleOnClick}>장비 등록</Button>
    </div>
  );
}
