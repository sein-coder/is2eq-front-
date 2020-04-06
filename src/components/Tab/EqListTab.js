import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, TextField, Select, FormControl, FormHelperText, MenuItem, InputLabel, Button} from "@material-ui/core";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { whiteColor } from "assets/css/react.js";
import styles from "assets/css/customTabsStyle.js";

import axios from "axios";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive, selectTab, handleOnClick} = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });


  const [value, setValue] = React.useState(selectTab);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const [searchFilter, setSearchFilter] = React.useState("");

  const [ip, setIp] = React.useState('');
  const [s_c, setS_C] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [project, setProject] = React.useState('');

  const preProcessing = (type) => {

  }

  const handleChangeFilter = (e) => {
    switch (e.currentTarget.id) {
      case "s_c":
        var temp = "";
        searchFilter.split(',').forEach((item, index) => {
          if(item.indexOf('s_c')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        setSearchFilter(temp+"s_c:"+e.target.value+",");
        setS_C(e.target.value);
        break;
      case "location":
        var temp = "";
        searchFilter.split(',').forEach((item, index) => {
          if(item.indexOf('location')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        setSearchFilter(temp+"location:"+e.target.value+",");
        setLocation(e.target.value);
        break;
      case "status":
        var temp = "";
        searchFilter.split(',').forEach((item, index) => {
          if(item.indexOf('status')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        setSearchFilter(temp+"status:"+e.target.value+",");
        setStatus(e.target.value);
        break;
      case "project":
        var temp = "";
        searchFilter.split(',').forEach((item, index) => {
          if(item.indexOf('project')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        setSearchFilter(temp+"project:"+e.target.value+",");
        setProject(e.target.value);
        break;
      default:
        var temp = "";
        searchFilter.split(',').forEach((item, index) => {
          if(item.indexOf('ip')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        setSearchFilter(temp+"ip:"+e.target.value+",");
        setIp(e.currentTarget.value);
        break;
    }
  }

  const [dataArray, setDataArray] = React.useState({});

  useEffect(() => {
    axios.get('/projects').then(response => {
      const temp = {};
      response.data.forEach(element => {
        temp[element.project_idx] = element.project_name;
      });
      setDataArray(temp);
    }).catch(error => {
      console.log(error);
    });
  },[]);


  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop, key) => {
            var icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
        <div className={classes.filterTitle}>검색필터</div>
        <GridContainer className={classes.tabsRoot}>
          <GridItem xs={6} sm={6} md={2} className={classes.tabRootButton}>
            <TextField
              value={ip}
              onChange={handleChangeFilter}
              label="IP 검색"
              id="ip"
              fullWidth
              margin="none"
              required
              name="ip"
              autoComplete="ip"
              InputProps={{
                style : { color : whiteColor},
                className : classes.select
              }}
              InputLabelProps={{
                style : {color : whiteColor}
              }}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-s_c-label">S/C</InputLabel>
              <Select
              className={classes.select}
              value={s_c}
              onChange={handleChangeFilter}
              labelid="select-s_c-label"
              id="s_c-select"
              inputProps={{
                  classes : {
                    icon : classes.icon,
                  },
              }}
              >
              <MenuItem id="s_c" value={"미정/미기재"}>미정/미기재</MenuItem>
              <MenuItem id="s_c" value={"서버용"}>서버용</MenuItem>
              <MenuItem id="s_c" value={"클라이언트용"}>클라이언트용</MenuItem>
              </Select>
              <FormHelperText style={{color:whiteColor}}>장비 사용 현황</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-location-label">장소</InputLabel>
              <Select
              className={classes.select}
              value={location}
              onChange={handleChangeFilter}
              labelid="select-location-label"
              id="location-select"
              inputProps={{
                classes : {
                  icon : classes.icon,
                },
            }}
              >
              <MenuItem id="location" value={1}>미확인</MenuItem>
              <MenuItem id="location" value={2}>텔코웨어 1층</MenuItem>
              <MenuItem id="location" value={3}>텔코웨어 2층</MenuItem>
              <MenuItem id="location" value={4}>텔코웨어 3층</MenuItem>
              <MenuItem id="location" value={5}>텔코웨어 4층</MenuItem>
              <MenuItem id="location" value={6}>텔코웨어 5층</MenuItem>
              <MenuItem id="location" value={7}>텔코웨어 옥상</MenuItem>
              <MenuItem id="location" value={8}>외부</MenuItem>
              </Select>
              <FormHelperText style={{color:whiteColor}}>장비 사용 현황</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-status-label">현황</InputLabel>
              <Select
              className={classes.select}
              value={status}
              onChange={handleChangeFilter}
              labelid="select-status-label"
              id="status-select"
              inputProps={{
                classes : {
                  icon : classes.icon,
                },
            }}
              >
              <MenuItem id="status" value={1}>미정</MenuItem>
              <MenuItem id="status" value={2}>비가용</MenuItem>
              <MenuItem id="status" value={3}>사용중</MenuItem>
              <MenuItem id="status" value={4}>사용예정</MenuItem>
              </Select>
              <FormHelperText style={{color:whiteColor}}>장비 사용 현황</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-project-label">프로젝트</InputLabel>
              <Select
              className={classes.select}
              value={project}
              onChange={handleChangeFilter}
              labelid="select-project-label"
              id="project-select"
              inputProps={{
                classes : {
                  icon : classes.icon,
                },
            }}
              >
              {Object.keys(dataArray).map((prop, key) => {
                return (
                  <MenuItem id="project" value={prop} className={classes.tableCell} key={key}>
                    {dataArray[prop]}
                  </MenuItem>
              )})}
              </Select>
              <FormHelperText style={{color:whiteColor}}>장비 사용 현황</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={2} className={classes.tabRootButton}>
            <Button style={{marginTop:"15px", color:whiteColor}} onClick={handleOnClick} value={searchFilter}>검색</Button>
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.propTypes = {
  selectTab : PropTypes.number,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
  handleOnClick : PropTypes.func,
};
