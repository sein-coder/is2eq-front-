import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import axios from 'axios'
import CameraDetail from 'components/content/Detail/CameraDetail.js';
import PcDetail from 'components/content/Detail/PcDetail.js';
import EtcDetail from 'components/content/Detail/EtcDetail.js';

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

export default function EqDetail() {
    const idx = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    
    const [dataObj, setDataObj] = React.useState({});

    useEffect(() => {
        axios.get(window.location.pathname.split("/home")[1])
          .then(function(response){
            const temp = {};
            Object.keys(response.data).forEach((element)=>{
                temp[element]= response.data[element];
            });
            setDataObj(temp);
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
                <Card>
                    <CardHeader color="primary">
                    <h2 className={classes.cardTitle}>{idx}번 장비 상세 정보</h2>
                    </CardHeader>
                    <CardBody>
                        {
                            (function() {
                                if (dataObj.category_name === '카메라') return (<CameraDetail data={dataObj}/>);
                                else if(dataObj.category_name === 'PC')  return (<PcDetail/>);
                                else return (<EtcDetail/>)
                            })()
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </div>
    );
}