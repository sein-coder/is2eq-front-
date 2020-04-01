import React, { useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
// @material-ui/icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import AdminTable from "components/Table/AdminTable.js";
import AdminOkTable from 'components/Table/AdminOkTable.js';
import AdminTab from "components/Tab/AdminTab.js";
import axios from "axios"

export default function AdminList() {
  const [allarray, setAllArray ] = React.useState([]);
  const [cameraarray, setCameraArray] = React.useState([]);
  
  useEffect(() => {
    axios.get('/admin/users')
      .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 2 ) {
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
  axios.get('/admin/okreq')
    .then(function(response){
      const dataArray = [];
      response.data.forEach(element => {
        const temp =[];
        Object.values(element).forEach((item,index)=> {
          if(index !== 2 ) {
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
  }, [])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AdminTab
            selectTab={0}
            title="카테고리:"
            headerColor="primary"
            tabs={[
              {
                tabName: "승인된 회원",
                tabIcon: DoneOutlineIcon,
                tabContent: (
                  <AdminTable
                tableHeaderColor="warning"
                tableHead={["유저번호", "아이디", "이름", "핸드폰 번호", "이메일 주소", "소속", "성별", "강제 탈퇴"]}
                tableData={allarray}
              />
                )
              },
              {
                tabName: "미승인된 회원",
                tabIcon: NotificationsIcon,
                tabContent: (
                  <AdminOkTable
                tableHeaderColor="warning"
                tableHead={["유저번호", "아이디", "이름", "핸드폰 번호", "이메일 주소", "소속", "성별", "승인 하기"]}
                tableData={cameraarray}
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
