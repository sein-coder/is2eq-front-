import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from 'components/Footer.js';
import DashBoard from 'components/content/DashBoard.js';
import NavBar from 'components/NavBar.js';
import { Switch, Route, Redirect } from "react-router-dom";
import EqList from 'components/content/EqList.js';
import EqEnroll from 'components/content/EqEnroll.js';
import Profile from 'components/content/Profile.js';

const switchRoutes = (
  <Switch>
    <Route path="/home/dashboard" component={DashBoard}/>
    <Route path="/home/profile" component={Profile}/>
    <Route path="/home/eqenroll" component={EqEnroll}/>
    <Route path="/home/eqlist" component={EqList}/>
    <Redirect from="/home" to="/home/dashboard" />
  </Switch>
);

const name = "현황판";

const NavBarName = (name) => {
  switch (window.location.pathname.split('/')[2]) {
    case "dashboard":
      name = "현황판"
      break;
    case "eqenroll":
      name = "장비 등록"
      break;
  }
}
  

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(3),
  },  
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar themeName = {name}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  style={{minHeight:"100vh"}} maxWidth="xl" className={classes.container}>
            {switchRoutes}
        </Container>
        <Footer/>
      </main>
    </div>
  );
}