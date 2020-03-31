import React, { useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import BuildIcon from '@material-ui/icons/Build';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExplicitIcon from '@material-ui/icons/Explicit';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import EqListTable from "components/Table/EqListTable.js";
import EqListTab from "components/Tab/EqListTab.js";

import axios from "axios"

import styles from "assets/css/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function EqList() {
  const [allarray, setAllArray ] = React.useState([]);
  const [cameraarray, setCameraArray] = React.useState([]);
  const [pcarray, setPcArray] = React.useState([]);
  const [etcarray, setEtcArray] = React.useState([]);
  
  useEffect(() => {
    axios.get('/equipments')
      .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 1 && index !== 3 && index !== 5 && index !== 7 && index !== 10) {
            if(Object.values(element).length-1 !== index){
              if(item == null || item === ""){
                temp.push("미기재")
              } else if(index === 13 || index === 14) {
                const tempDate = new Date(item);
                tempDate.setDate(tempDate.getDate()+1);
                temp.push(tempDate.getFullYear()+"-"+(tempDate.getMonth()+1)+"-"+tempDate.getDate());
              }
              else {
                temp.push(item+"");
              }
            }
          }
        });
        dataArray.push(temp);
      });
      setAllArray(dataArray);
    })
    .catch(function(error){
      console.log(error);
    })
  axios.get('/equipments?type=category_idx&filter=1')
    .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 1 && index !== 3 && index !== 5 && index !== 7 && index !== 10) {
            if(Object.values(element).length-1 !== index){
              if(item == null || item === ""){
                temp.push("미기재")
              } else if(index === 13 || index === 14) {
                const tempDate = new Date(item);
                tempDate.setDate(tempDate.getDate()+1);
                tempDate.setMonth(tempDate.getMonth()+1);
                temp.push(tempDate.getFullYear()+"-"+tempDate.getMonth()+"-"+tempDate.getDate());
              }
              else {
                temp.push(item+"");
              }
            }
          }
        });
        dataArray.push(temp);
      });
      setCameraArray(dataArray);
    })
    .catch(function(error){
      console.log(error);
    })

    axios.get('/equipments?type=category_idx&filter=2')
    .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 1 && index !== 3 && index !== 5 && index !== 7 && index !== 10) {
            if(Object.values(element).length-1 !== index){
              if(item == null || item === ""){
                temp.push("미기재")
              } else if(index === 13 || index === 14) {
                const tempDate = new Date(item);
                tempDate.setDate(tempDate.getDate()+1);
                tempDate.setMonth(tempDate.getMonth()+1);
                temp.push(tempDate.getFullYear()+"-"+tempDate.getMonth()+"-"+tempDate.getDate());
              }
              else {
                temp.push(item+"");
              }
            }
          }
        });
        dataArray.push(temp);
      });
      setPcArray(dataArray);
    })
    .catch(function(error){
      console.log(error);
    })

    axios.get('/equipments?type=category_idx&filter=3')
    .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 1 && index !== 3 && index !== 5 && index !== 7 && index !== 10) {
            if(Object.values(element).length-1 !== index){
              if(item == null || item === ""){
                temp.push("미기재")
              } else if(index === 13 || index === 14) {
                const tempDate = new Date(item);
                tempDate.setDate(tempDate.getDate()+1);
                tempDate.setMonth(tempDate.getMonth()+1);
                temp.push(tempDate.getFullYear()+"-"+tempDate.getMonth()+"-"+tempDate.getDate());
              }
              else {
                temp.push(item+"");
              }
            }
          }
        });
        dataArray.push(temp);
      });
      setEtcArray(dataArray);
    })
    .catch(function(error){
      console.log(error);
    })
  }, [])



  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <EqListTab
            selectTab={0}
            title="카테고리:"
            headerColor="primary"
            tabs={[
              {
                tabName: "전체 장비",
                tabIcon: BuildIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="warning"
                tableHead={["장비번호", "분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={allarray}
              />
                )
              },
              {
                tabName: "카메라 장비",
                tabIcon: CameraAltIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="warning"
                tableHead={["장비번호", "분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={cameraarray}
              />
                )
              },
              {
                tabName: "PC 장비",
                tabIcon: DesktopWindowsIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="warning"
                tableHead={["장비번호", "분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={pcarray}
              />
                )
              },
              {
                tabName: "기타 장비",
                tabIcon: ExplicitIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="warning"
                tableHead={["장비번호", "분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={etcarray}
              />
                )
              }
            ]}
            />
        </GridItem>
      </GridContainer>
    </div>
  );
}
