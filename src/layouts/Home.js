import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from 'components/Footer.js';
import DashBoard from 'components/content/DashBoard.js';
import NavBar from 'components/NavBar.js';
import { Switch, Route, Redirect } from "react-router-dom";
import EqList from 'components/content/EqList.js';
import EqEnroll from 'components/content/EqEnroll.js';
import Profile from 'components/content/Profile.js';
import EqDetail from 'components/content/EqDetail.js';

const switchRoutes = (
  <Switch>
    <Route path="/home/dashboard" component={DashBoard}/>
    <Route path="/home/profile" component={Profile}/>
    <Route path="/home/eqenroll" component={() => <EqEnroll selectTab = {0}/>}/>
    <Route path="/home/eqlist" component={EqList}/>
    <Route path="/home/equipments" component={EqDetail}/>
    <Redirect from="/home" to="/home/dashboard" />
  </Switch>
);

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

  const [themeName, setThemeName] = React.useState("현황판");

  function NavBarName() {
    switch (window.location.pathname.split('/')[2]) {
      case "eqenroll":
        setThemeName("장비 등록");
        break;
      case "profile":
        setThemeName("유저 프로필");
        break;
      case "eqlist":
        setThemeName("장비 리스트");
        break;
      default:
        setThemeName("현황판");
        break;
    }
  }
  useEffect(()=> {
    NavBarName();
  })

  return (
    <div className={classes.root}>
      <NavBar themeName = {themeName}/>
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