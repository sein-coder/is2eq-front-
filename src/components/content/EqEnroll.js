import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/Tab/CustomTabs.js";

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExplicitIcon from '@material-ui/icons/Explicit';

import CameraEnroll from 'components/content/Enroll/CameraEnroll';
import EtcEnroll from 'components/content/Enroll/EtcEnroll';
import PcEnroll from "components/content/Enroll/PCEnroll";

import axios from 'axios';

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

export default function EqEnroll(props) {
  const handleSelectTab = () => {
    switch ({props}.props.match.params.id) {
      case "pc":
        return 1;
      case "etc":
        return 2;
      default:
        return 0;
    }
  }

  const [dataArray, setDataArray] = React.useState({});

  useEffect(() => {
    axios.get('/projects').then(response => {
      const temp = {};
      response.data.forEach(element => {
        temp[element.project_idx] = element.project_name+ " - "+element.project_usage;
      });
      setDataArray(temp);
    }).catch(error => {
      console.log(error);
    });
  },[]);


  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            selectTab = {handleSelectTab}
            title="카테고리:"
            headerColor="primary"
            tabs={[
              {
                tabName: "카메라 장비",
                tabIcon: CameraAltIcon,
                tabContent: (
                  <CameraEnroll dataArray={dataArray}/>
                )
              },
              {
                tabName: "PC 장비",
                tabIcon: DesktopWindowsIcon,
                tabContent: (
                  <PcEnroll dataArray={dataArray}/>
                )
              },
              {
                tabName: "기타 장비",
                tabIcon: ExplicitIcon,
                tabContent: (
                  <EtcEnroll dataArray={dataArray}/>
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

EqEnroll.propTypes = {
  selectTab : PropTypes.number
};
