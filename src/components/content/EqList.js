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

  const dataPreProcess = (responseData) => {
    const dataArray = [];
      responseData.forEach((element,index) => {
      const temp = []
      temp.push(index+1+"");
      Object.keys(element).forEach((key, index) => {
        if( (index === 2 || index === 3 || index === 4 ) && index === element.category_idx+1) {
          temp.push(element[key]!=null?element[key]+"":"미기재");
        } else if(index !== 2 && index !== 3 && index !== 4 && index !== 5 && index !== 7 && index !== 9 && index !== 11 && index !== 14 && index !== 19){
            if((index === 17 || index === 18) && element[key] !== null) {
              const tempDate = new Date(element[key]);
              tempDate.setDate(tempDate.getDate()+1);
              temp.push(tempDate.getFullYear()+"-"+(tempDate.getMonth()+1)+"-"+tempDate.getDate());
            }
            else {
              temp.push(element[key]!==null?(element[key]!==""?element[key]+"":"미기재"):"미기재");
            }
        }
      });
      dataArray.push(temp);
    });
    return dataArray;
  }

  const getListData = (condition) => {
    if(condition !== null) {
      axios.get('/equipments?type='+condition.type+"&filter="+condition.filter)
      .then(function(response){
        setAllArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
      axios.get('/equipments?type=category_idx&filter=1')
      .then(function(response){
        setCameraArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=category_idx&filter=2')
      .then(function(response){
        setPcArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=category_idx&filter=3')
      .then(function(response){
        setEtcArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
    }else {
      axios.get('/equipments')
      .then(function(response){
        setAllArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
      axios.get('/equipments?type=category_idx&filter=1')
      .then(function(response){
        setCameraArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=category_idx&filter=2')
      .then(function(response){
        setPcArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=category_idx&filter=3')
      .then(function(response){
        setEtcArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
    }
  }
  
  useEffect(() => {
    getListData(null);
  }, [])

  const handleOnClick = (event) => {
    console.log(event.currentTarget.value);
    const condition = {
      type : "category_idx",
      filter : "3"
    };
    getListData(condition);
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <EqListTab
            handleOnClick = {handleOnClick}
            selectTab={0}
            title="카테고리:"
            headerColor="primary"
            tabs={[
              {
                tabName: "전체 장비",
                tabIcon: BuildIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="primary"
                tableHead={["번호", "S/C", "장비 IP","분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={allarray}
              />
                )
              },
              {
                tabName: "카메라 장비",
                tabIcon: CameraAltIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="primary"
                tableHead={["번호", "S/C", "장비 IP","분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={cameraarray}
              />
                )
              },
              {
                tabName: "PC 장비",
                tabIcon: DesktopWindowsIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="primary"
                tableHead={["번호", "S/C", "장비 IP","분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
                tableData={pcarray}
              />
                )
              },
              {
                tabName: "기타 장비",
                tabIcon: ExplicitIcon,
                tabContent: (
                  <EqListTable
                tableHeaderColor="primary"
                tableHead={["번호", "S/C", "장비 IP","분류", "장소", "장비 현황", "프로젝트", "용도", "자산 소유", "소유주명", "입고 날짜", "반납날짜","상세보기","삭제"]}
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