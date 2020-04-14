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

  const dataPreProcess = (responseData, order) => {
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

    if(order !== undefined && order !== '') {
      const orderObj = { };
      order.split(',').forEach(element => {
        if(element !== '') {
          orderObj[element.split(':')[0]] = element.split(':')[1];
        }
      })
      if(orderObj['orderType'] === '' || orderObj['orderType'] === undefined) { orderObj['orderType'] = 'ASC' }
      switch(orderObj['orderName']) {
        case 'ip' : 
          if(orderObj['orderType'] === 'ASC') {
            dataArray.sort((a,b) => {
              if(a[3] === "미기재" || b[3] === "미기재") { return (a[3].length > b[3].length) ? -1 : 1 }
              return (a[3].length < b[3].length) ? -1 : 1;
            });
          }else {
            dataArray.sort((a,b) => {
              return (a[3].length > b[3].length) ? -1 : 1;
            });
          }
          break;
        case 's_c' : 
          if(orderObj['orderType'] === 'ASC') {
            dataArray.sort((a,b) => {
              if(a[2] === "미기재" || a[2] === '미정' || b[2] === "미기재" || b[2] === '미정') { return a[2] > b[2]? -1 : 1};
              return (a[2] < b[2]) ? -1 : 1;
            });
          }else {
            dataArray.sort((a,b) => {
              return (a[2] > b[2]) ? -1 : 1;
            });
          }
          break;
        case 'location' : 
          if(orderObj['orderType'] === 'ASC') {
            dataArray.sort((a,b) => {
              if(a[5] === '미확인' || b[5] === '미확인') { return (a[5].length > b[5].length) ? -1 : 1 }
              return (a[5] < b[5]) ? -1 : 1;
            });
          }else {
            dataArray.sort((a,b) => {
              return (a[5] > b[5]) ? -1 : 1;
            });
          }
          break;
        case 'status' : 
          if(orderObj['orderType'] === 'ASC') {
            dataArray.sort((a,b) => {
              if(a[6] === '미정' || b[6] === '미정') { return (a[6] > b[6]) ? -1 : 1 }
              return (a[6] < b[6]) ? -1 : 1;
            });
          }else {
            dataArray.sort((a,b) => {
              return (a[6] > b[6]) ? -1 : 1;
            });
          }
          break;
        case 'project' : 
          if(orderObj['orderType'] === 'ASC') {
            dataArray.sort((a,b) => {
              return (a[7] < b[7]) ? -1 : 1;
            });
          }else {
            dataArray.sort((a,b) => {
              if(a[7] === "미기재" || b[7] === "미기재") { return (a[7] < b[7]) ? -1 : 1 }
              return (a[7] > b[7]) ? -1 : 1;
            });
          }
          break;
        default :
          break;
      }
    }
    return dataArray;
  }

  const getListData = (condition) => {
    if(condition !== null) {
      axios.get('/equipments?filter='+condition.filter)
      .then(function(response){
        setAllArray(dataPreProcess(response.data, condition.order));
      })
      .catch(function(error){
        console.log(error);
      })
      axios.get('/equipments?type=1&filter='+condition.filter)
      .then(function(response){
        setCameraArray(dataPreProcess(response.data, condition.order));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=2&filter='+condition.filter)
      .then(function(response){
        setPcArray(dataPreProcess(response.data, condition.order));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=3&filter='+condition.filter)
      .then(function(response){
        setEtcArray(dataPreProcess(response.data, condition.order));
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
      axios.get('/equipments?type=1')
      .then(function(response){
        setCameraArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=2')
      .then(function(response){
        setPcArray(dataPreProcess(response.data));
      })
      .catch(function(error){
        console.log(error);
      })
  
      axios.get('/equipments?type=3')
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
    const condition = {
      filter : event.currentTarget.value,
      order : event.currentTarget.name
    };
    getListData(condition);
  };

  const handleInitOnClick = (event) => {
    getListData(null);
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <EqListTab
            handleOnClick = {handleOnClick}
            handleInitOnClick = {handleInitOnClick}
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