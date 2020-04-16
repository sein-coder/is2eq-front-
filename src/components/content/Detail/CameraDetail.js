import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Dialog from "components/content/Dialog/ProjectDialog.js";
import {Button, Select, FormControl, FormHelperText, MenuItem, InputLabel, TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from "assets/css/customInputStyle.js";
import PropTypes from "prop-types";

import axios from 'axios';

const useStyles = makeStyles(styles);

export default function CameraDetail(props) {
  const classes = useStyles();

  const {data, idx, dataArray} = props;

  const [camera_ip, setCamera_ip] = React.useState(data.camera_ip!==null?data.camera_ip:"");
  const [camera_id, setCamera_id] = React.useState(data.camera_id!==null?data.camera_id:"");
  const [camera_pw, setCamera_pw] = React.useState(data.camera_pw!==null?data.camera_pw:"");
  const [camera_mac_addr, setCamera_mac_addr] = React.useState(data.camera_mac_addr!==null?data.camera_mac_addr:"");
  const [camera_brand, setCamera_brand] = React.useState(data.camera_brand!==null?data.camera_brand:"");
  const [camera_model_name, setCamera_model_name] = React.useState(data.camera_model_name!==null?data.camera_model_name:"");

  const handleChangeIp = e => {setCamera_ip(e.target.value)};
  const handleChangeId = e => {setCamera_id(e.target.value)};
  const handleChangePw = e => {setCamera_pw(e.target.value)};
  const handleChangeMac = e => {setCamera_mac_addr(e.target.value)};
  const handleChangeBrand = e => {setCamera_brand(e.target.value)};
  const handleChangeModelName = e => {setCamera_model_name(e.target.value)};

  const [location, setLocation] = React.useState(data.location_idx);
  const [project, setProject] = React.useState(data.project_idx);
  const [status, setStatus] = React.useState(data.status_idx);
  const [possession, setPossession] = React.useState(data.possession_idx);
  const [equip_remarks, setRemarks] = React.useState(data.equip_remarks!==null?data.equip_remarks:"");
  const [owner_name, setOwner_name] = React.useState(data.owner_name!==null?data.owner_name:"");

  const receiveddate = data.received_date!==null?new Date(data.received_date).setDate(new Date(data.received_date).getDate()+1):null;
  const returndate = data.return_date!==null?new Date(data.return_date).setDate(new Date(data.return_date).getDate()+1):null;

  const [received_date, setReceivedDate] = React.useState(receiveddate);
  const [return_date, setReturnDate] = React.useState(returndate);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => { setOpen(false) };

  const handleChangeLocation = e => { setLocation(e.target.value); };
  const handleChangeProject = e => { 
    if(e.target.value === 0) {
      setOpen(true);
    }
    else {
      setProject(e.target.value);
    }
  };
  const handleChangeStatus = e => { setStatus(e.target.value); };
  const handleChangePossession = e => { setPossession(e.target.value); };
  const handleChangeRemarks = e => {setRemarks(e.target.value)};
  const handleOwnerName = e => {setOwner_name(e.target.value)};
  const handleReceivedDate = date => {setReceivedDate(date)};
  const handleReturnDate = date => {setReturnDate(date)};


  const handleOnClick = (e) => {
    e.preventDefault();
    if({camera_ip}.camera_ip !== '' && {camera_id}.camera_id !== '' && {camera_pw}.camera_pw !== ''){
        axios.patch('/equipments/'+idx, {
            "category_idx" : 1,
            "location_idx" : {location}.location,
            "project_idx" : {project}.project,
            "equip_status" : {status}.status,
            "equip_possession" : {possession}.possession,
            "equip_remarks" : {equip_remarks}.equip_remarks,
            "camera_ip" : {camera_ip}.camera_ip,
            "camera_id" : {camera_id}.camera_id,
            "camera_pw" : {camera_pw}.camera_pw,
            "camera_mac_addr" : {camera_mac_addr}.camera_mac_addr,
            "camera_brand" : {camera_brand}.camera_brand,
            "camera_model_name" : {camera_model_name}.camera_model_name,
            "owner_name" : {owner_name}.owner_name,
            "received_date" : {received_date}.received_date,
            "return_date" : {return_date}.return_date
        }).then(response => {
          if(response.data > 0) {
            alert("정보 수정 성공");
            window.location.reload();
          }else {
            alert("정보 수정 실패");
          }
        }).catch(error => {
          alert("정보 수정 실패");
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
                    value = {camera_ip}
                    onChange = {handleChangeIp}
                    label="카메라 IP"
                    id="camera_ip"
                    fullWidth
                    margin="normal"
                    required
                    name="camera_ip"
                    autoComplete="camera_ip"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {camera_id}
                    onChange = {handleChangeId}
                    label="카메라 접속 ID"
                    id="camera_id"
                    fullWidth
                    margin="normal"
                    required
                    name="camera_id"
                    autoComplete="camera_id"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {camera_pw}
                    onChange = {handleChangePw}
                    label="카메라 PassWord"
                    id="camera_pw"
                    fullWidth
                    margin="normal"
                    required
                    name="camera_pw"
                    autoComplete="camera_pw"
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                  <TextField
                    value = {camera_mac_addr}
                    onChange = {handleChangeMac}
                    label="카메라 MAC 주소"
                    id="camera_mac_addr"
                    fullWidth
                    margin="normal"
                    name="camera_mac_addr"
                    autoComplete="camera_mac_addr"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={4} sm={4} md={2}>
                  <TextField
                    value = {camera_brand}
                    onChange = {handleChangeBrand}
                    label="카메라 브랜드"
                    id="camera_brand"
                    fullWidth
                    margin="normal"
                    name="camera_brand"
                    autoComplete="camera_brand"
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                 <TextField
                    value = {camera_model_name}
                    onChange = {handleChangeModelName}
                    label="카메라 모델 명"
                    id="camera_model_name"
                    fullWidth
                    margin="normal"
                    name="camera_model_name"
                    autoComplete="camera_model_name"
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
                <GridItem xs={6} sm={6} md={3}>
                    <FormControl style={{marginTop : "35px"}} className={classes.formControl} fullWidth>
                          <InputLabel id="select-project-label">프로젝트 명 - 용도</InputLabel>
                          <Select
                          labelid="select-project-label"
                          id="project-select"
                          value={project}
                          onChange={handleChangeProject}
                          >
                          {Object.keys(dataArray).map((prop, key) => {
                          return (
                            <MenuItem value={prop} className={classes.tableCell} key={key}>
                              {dataArray[prop]}
                            </MenuItem>
                          )})}
                          <MenuItem value={0}>프로젝트 추가+</MenuItem>
                          </Select>
                          <FormHelperText>주로 사용되는 프로젝트 명과 용도</FormHelperText>
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
                <GridItem xs={4} sm={4} md={2}></GridItem>
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
              <Button style={{marginTop: "2rem", backgroundColor:"#9c27b0"}} color="primary" onClick={handleOnClick}  variant="contained">정보 수정</Button>
              <Button style={{marginTop: "2rem", marginLeft : "2rem", backgroundColor:"#9c27b0"}} color="primary" href={"/home/eqlist/"} variant="contained">나가기</Button>

              <Dialog Open = {open} handleClose = {handleClose}/>
    </div>
  );
}

CameraDetail.propTypes = {
  data : PropTypes.object,
  idx : PropTypes.string,
  dataArray : PropTypes.object,
};