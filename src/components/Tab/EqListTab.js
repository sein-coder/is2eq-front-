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
  const { headerColor, plainTabs, tabs, title, rtlActive, selectTab, handleOnClick, handleInitOnClick} = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });


  const [value, setValue] = React.useState(selectTab);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const [searchFilter, setSearchFilter] = React.useState("");
  const [searchName, setSearchName] = React.useState("");

  const [ip, setIp] = React.useState('');
  const [s_c, setS_C] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [project, setProject] = React.useState('');

  const [orderName, setOrderName] = React.useState('');
  const [orderType, setOrderType] = React.useState('');

  var temp = "";

  const handleChangeFilter = (e) => {
    switch (e.currentTarget.id) {
      case "orderName" :
        temp = "";
        searchName.split(',').forEach((item) => {
          if(item.indexOf('orderName')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === '선택 취소') { setOrderName(''); }
        else { setOrderName(e.target.value); }
        setSearchName(temp+"orderName:"+e.target.value+",");
        break;
      case "orderType" :
        temp = "";
        searchName.split(',').forEach((item) => {
          if(item.indexOf('orderType')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === '선택 취소') setOrderType('');
        else setOrderType(e.target.value);
        setSearchName(temp+"orderType:"+e.target.value+",");
        break;
      case "s_c":
        temp = "";
        searchFilter.split(',').forEach((item) => {
          if(item.indexOf('s_c')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === 0) setS_C('');
        else setS_C(e.target.value);
        setSearchFilter(temp+"s_c:"+e.target.value+",");
        break;
      case "location":
        temp = "";
        searchFilter.split(',').forEach((item) => {
          if(item.indexOf('location')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === 0) setLocation('');
        else setLocation(e.target.value);
        setSearchFilter(temp+"location:"+e.target.value+",");
        break;
      case "status":
        temp = "";
        searchFilter.split(',').forEach((item) => {
          if(item.indexOf('status')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === 0) setStatus('');
        else setStatus(e.target.value);
        setSearchFilter(temp+"status:"+e.target.value+",");
        break;
      case "project":
        temp = "";
        searchFilter.split(',').forEach((item) => {
          if(item.indexOf('project')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === 0) setProject('');
        else setProject(e.target.value);
        setSearchFilter(temp+"project:"+e.target.value+",");
        break;
      default:
        temp = "";
        searchFilter.split(',').forEach((item) => {
          if(item.indexOf('ip')!== 0 && item !== "") {
            temp += item+",";
          }
        });
        if(e.target.value === '') setSearchFilter(temp);
        else setSearchFilter(temp+"ip:"+e.target.value+",");
        setIp(e.target.value);
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
              <MenuItem id="s_c" value={0}>선택 취소</MenuItem>
              <MenuItem id="s_c" value={11}>미정/미기재</MenuItem>
              <MenuItem id="s_c" value={12}>서버용</MenuItem>
              <MenuItem id="s_c" value={13}>클라이언트용</MenuItem>
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
              <MenuItem id="location" value={0}>선택 취소</MenuItem>
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
              <MenuItem id="status" value={0}>선택 취소</MenuItem>
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
              <MenuItem id="project" value={0}>선택 취소</MenuItem>
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
        </GridContainer>
        <div className={classes.orderTitle}>정렬 필터</div>
        <GridContainer className={classes.tabsRoot}>
          <GridItem xs={4} sm={4} md={2} style={{marginTop : "10px"}}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-orderName-label">정렬 조건</InputLabel>
              <Select
              className={classes.select}
              value={orderName}
              onChange={handleChangeFilter}
              labelid="select-orderName-label"
              id="orderName-select"
              inputProps={{
                  classes : {
                    icon : classes.icon,
                  },
              }}
              >
              <MenuItem id="orderName" value={'선택 취소'}>선택 취소</MenuItem>
              <MenuItem id="orderName" value={'ip'}>IP</MenuItem>
              <MenuItem id="orderName" value={'s_c'}>S/C</MenuItem>
              <MenuItem id="orderName" value={'location'}>장소</MenuItem>
              <MenuItem id="orderName" value={'status'}>현황</MenuItem>
              <MenuItem id="orderName" value={'project'}>프로젝트</MenuItem>
              </Select>
              <FormHelperText style={{color:whiteColor}}>IP 정렬 조건</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={4} sm={4} md={2} style={{marginTop : "10px"}}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel style={{color:whiteColor}} id="select-orderType-label">정렬 방식</InputLabel>
              <Select
              className={classes.select}
              value={orderType}
              onChange={handleChangeFilter}
              labelid="select-orderType-label"
              id="orderType-select"
              inputProps={{
                  classes : {
                    icon : classes.icon,
                  },
              }}
              >
              <MenuItem id="orderType" value={'선택 취소'}>선택 취소</MenuItem>
              <MenuItem id="orderType" value={'ASC'}>오름차순</MenuItem>
              <MenuItem id="orderType" value={'DESC'}>내림차순</MenuItem>
              </Select>
              <FormHelperText style={{color:whiteColor}}>오름차순/내림차순</FormHelperText>
              </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.tabRootButton}>
          </GridItem>
          <GridItem className={classes.tabRootButton}>
            <Button variant="outlined" style={{marginTop:"25px", color:whiteColor}} onClick={handleInitOnClick}>결과 초기화</Button>
          </GridItem>
          <GridItem xs={2} sm={2} md={1} className={classes.tabRootButton}>
            <Button variant="outlined" style={{marginTop:"25px", color:whiteColor}} onClick={handleOnClick} value={searchFilter} name={searchName}>검색</Button>
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
  handleInitOnClick : PropTypes.func,
};
