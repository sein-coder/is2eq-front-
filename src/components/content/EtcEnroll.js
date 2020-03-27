import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { Select, FormControl, FormHelperText, MenuItem, InputLabel, } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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

export default function EtcEnroll() {
  const classes = useStyles();

  const [camera_ip, setCamera_ip] = React.useState('');
  const [camera_id, setCamera_id] = React.useState('');
  const [camera_pw, setCamera_pw] = React.useState('');
  const [camera_mac_addr, setCamera_mac_addr] = React.useState('');
  const [camera_brand, setCamera_brand] = React.useState('');
  const [camera_model_name, setCamera_model_name] = React.useState('');

  const handleChangeIp = e => {setCamera_ip(e.target.value)};
  const handleChangeId = e => {setCamera_id(e.target.value)};
  const handleChangePw = e => {setCamera_pw(e.target.value)};
  const handleChangeMac = e => {setCamera_mac_addr(e.target.value)};
  const handleChangeBrand = e => {setCamera_brand(e.target.value)};
  const handleChangeModelName = e => {setCamera_model_name(e.target.value)};

  const [location, setLocation] = React.useState(1);
  const [project, setProject] = React.useState(1);
  const [status, setStatus] = React.useState(1);
  const [possession, setPossession] = React.useState(1);
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
  const handleReceivedDate = e => {setReceivedDate(e.target.value)};
  const handleReturnDate = e => {setReturnDate(e.target.value)};

  return (
    <div style={{paddingLeft:"100px", paddingRight:"100px"}}>
              <GridContainer>
                <GridItem xs={6} sm={6} md={2}>
                  <CustomInput
                    value = {camera_ip}
                    onChange = {handleChangeIp}
                    labelText="카메라 IP"
                    id="camera_ip"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <CustomInput
                    value = {camera_id}
                    onChange = {handleChangeId}
                    labelText="카메라 접속 ID"
                    id="camera_id"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <CustomInput
                    value = {camera_pw}
                    onChange = {handleChangePw}
                    labelText="카메라 PassWord"
                    id="camera_pw"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                  <CustomInput
                    value = {camera_mac_addr}
                    onChange = {handleChangeMac}
                    labelText="카메라 MAC 주소"
                    id="camera_mac_addr"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={4} sm={4} md={2}>
                  <CustomInput
                    value = {camera_brand}
                    onChange = {handleChangeBrand}
                    labelText="카메라 브랜드"
                    id="camera_brand"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <CustomInput
                    value = {camera_model_name}
                    onChange = {handleChangeModelName}
                    labelText="카메라 모델 명"
                    id="camera_model_name"
                    formControlProps={{
                      fullWidth: true
                    }}
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
                          <MenuItem value={6}>소유</MenuItem>
                          <MenuItem value={7}>대여</MenuItem>
                          </Select>
                          <FormHelperText>장비 소유현황</FormHelperText>
                      </FormControl>
                </GridItem>
                <GridItem xs={8} sm={8} md={4}></GridItem>
                <GridItem xs={4} sm={4} md={2}>
                  <CustomInput
                    value = {owner_name}
                    onChange = {handleOwnerName}
                    labelText="소유주 명"
                    id="owner_name"
                    formControlProps={{
                      fullWidth: true
                    }}
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
                  <CustomInput
                    value = {equip_remarks}
                    onChange = {handleChangeRemarks}
                    labelText="비고"
                    id="equip_remarks"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>

              </GridContainer>
              <Button style={{marginTop: "2rem"}} color="primary">장비 등록</Button>
    </div>
  );
}
