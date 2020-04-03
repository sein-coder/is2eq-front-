import React, { useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import BuildIcon from '@material-ui/icons/Build';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExplicitIcon from '@material-ui/icons/Explicit';
import {Link} from 'react-router-dom';

import AddBoxIcon from '@material-ui/icons/AddBox';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import axios from "axios"

import styles from "assets/css/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [all, setAll] = React.useState(0);
  const [cam, setCam] = React.useState(0);
  const [pc, setPc] = React.useState(0);
  const [etc, setEtc] = React.useState(0);

  const [eqlogs, setEqlogs ] = React.useState([]);
  const [userlogs, setUserlogs] = React.useState([]);

  useEffect(() => {
    axios.get('/equipments')
    .then(function(response){
      setAll(response.data.length);
    })
    .catch(function(error){
      console.log(error);
    })
  axios.get('/equipments?type=category_idx&filter=1')
    .then(function(response){
      setCam(response.data.length);
    })
    .catch(function(error){
      console.log(error);
    })

    axios.get('/equipments?type=category_idx&filter=2')
    .then(function(response){
      setPc(response.data.length);
    })
    .catch(function(error){
      console.log(error);
    })

    axios.get('/equipments?type=category_idx&filter=3')
    .then(function(response){
      setEtc(response.data.length);
    })
    .catch(function(error){
      console.log(error);
    })

    axios.get('/equipments/log')
    .then(function(response){
      const dataArray = [];
      response.data.forEach((element,index) => {
        if(index < 8) {
          const temp =[];
          Object.values(element).forEach((item,index)=> {
            if(index !== 1) {
              temp.push(item+"");
            }
          });
          dataArray.push(temp);
        }
      });
      setEqlogs(dataArray);
    })
    .catch((error) => {
      console.log(error)
    })

    axios.get('/users/log')
    .then(function(response){
      const dataArray = [];
      response.data.forEach((element,index) => {
        if(index < 8) {
          const temp =[];
          Object.values(element).forEach((item,index)=> {
            if(index !== 0 && index !== 1) {
              temp.push(item+"");
            }
          });
          dataArray.push(temp);
        }
      });
      setUserlogs(dataArray);
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <BuildIcon/>
              </CardIcon>
              <p style={{fontSize:"25px", color:"black"}} className={classes.cardCategory}>전체 장비 현황</p>
              <h3 style={{fontSize:"20px"}} className={classes.cardTitle}>
                {all} <small>개</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <AddBoxIcon />
                  <Link to="/home/eqenroll/all" style={{textDecoration:"none", color:"black"}}>
                    <h4 style={{display:"inline"}}>장비 등록</h4>
                  </Link>
                </Danger>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <CameraAltIcon />
              </CardIcon>
              <p style={{fontSize:"25px", color:"black"}} className={classes.cardCategory}>카메라 장비 현황</p>
              <h3 style={{fontSize:"20px"}} className={classes.cardTitle}>
                {cam} <small>개</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <AddBoxIcon />
                  <Link to="/home/eqenroll/camera" style={{textDecoration:"none", color:"black"}}>
                    <h4 style={{display:"inline"}}>카메라 장비 등록</h4>
                  </Link>
                </Danger>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <DesktopWindowsIcon/>
              </CardIcon>
              <p style={{fontSize:"25px", color:"black"}} className={classes.cardCategory}>PC 장비 현황</p>
              <h3 style={{fontSize:"20px"}} className={classes.cardTitle}>
                {pc} <small>개</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <AddBoxIcon />
                  <Link to="/home/eqenroll/pc" style={{textDecoration:"none", color:"black"}}>
                    <h4 style={{display:"inline"}}>PC 장비 등록</h4>
                  </Link>
                </Danger>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <ExplicitIcon />
              </CardIcon>
              <p style={{fontSize:"25px", color:"black"}} className={classes.cardCategory}>기타 장비 현황</p>
              <h3 style={{fontSize:"20px"}} className={classes.cardTitle}>
                {etc} <small>개</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <AddBoxIcon />
                  <Link to="/home/eqenroll/etc" style={{textDecoration:"none", color:"black"}}>
                    <h4 style={{display:"inline"}}>기타 장비 등록</h4>
                  </Link>
                </Danger>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
     
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>최근 장비 요청 로그</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["로그번호", "요청 메소드", "요청 시기"]}
                  tableData={eqlogs}
                />
              </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>최근 로그인 로그</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["아이디", "로그인/아웃", "날짜"]}
                tableData={userlogs}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
