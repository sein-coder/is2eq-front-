import React from "react";
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
import Table from "components/Table/Table.js";
import CustomTabs from "components/Tab/CustomTabs.js";

import axios from "axios"

import styles from "assets/css/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function EqList() {

  axios.get('http://10.10.1.103:8080/admin/okreq')
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="변경사항:"
            headerColor="primary"
            tabs={[
              {
                tabName: "전체 장비",
                tabIcon: BuildIcon,
                tabContent: (
                  <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
                )
              },
              {
                tabName: "카메라 장비",
                tabIcon: CameraAltIcon,
                tabContent: (
                  <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
                )
              },
              {
                tabName: "PC 장비",
                tabIcon: DesktopWindowsIcon,
                tabContent: (
                  <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
                )
              },
              {
                tabName: "기타 장비",
                tabIcon: ExplicitIcon,
                tabContent: (
                  <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
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
