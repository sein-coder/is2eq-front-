import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import {Button, Tab, Tabs, Box} from "@material-ui/core";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/css/customTabsStyle.js";
import CardFooter from "components/Card/CardFooter";

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive, selectTab, button } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });

  const [value, setValue] = React.useState(selectTab);
  const handleChange = (event, value) => {
    setValue(value);
  };

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
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
      <CardFooter>
        <Box style={{width:"100%"}} display="flex" flexDirection="row-reverse" p={1} m={1}>
          <Box p={1}>
            <Button style={{backgroundColor:"#9c27b0" }}
            color="primary"
            href="#"
            variant="contained">{button}</Button>
          </Box>
        </Box>
      </CardFooter>
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
  button:PropTypes.string
};
