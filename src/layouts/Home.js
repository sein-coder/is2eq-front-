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
import AdminList from 'components/content/AdminList.js';

import axios from 'axios';

const switchRoutes = (
  <Switch>
    <Route path="/home/dashboard" component={DashBoard}/>
    <Route path="/home/profile" component={Profile}/>
    <Route path="/home/eqenroll/:id" component={EqEnroll}/>
    <Route path="/home/eqlist" component={EqList}/>
    <Route path="/home/equipments" component={EqDetail}/>
    <Route path="/home/admin" component={AdminList}/>
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

  const [loginUser, setLoginUser] = React.useState({});

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
      case "admin":
        setThemeName("Admin 회원 관리");
        break;
      default:
        setThemeName("현황판");
        break;
    }
  }
  useEffect(()=> {
    NavBarName();
  });

  useEffect(()=> {
    NavBarName();

    axios.get('/users/login')
    .then(function(response){
      if(response.data === "") {
        const temp = {user_idx : 0}
        setLoginUser(temp);
      } else {
        setLoginUser(response.data);
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }, []);

  return (
    <div className={classes.root}>
      <NavBar themeName = {themeName} loginUser = {loginUser.user_idx}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  style={{minHeight:"100vh", backgroundColor:"#fef7e1"}} maxWidth="xl" className={classes.container}>
          {
              (function() {
                  if(loginUser.user_idx === -1 && loginUser.user_id === "root") return;
                  else if (loginUser.user_idx !== 0) return ;
                  else {
                    alert("로그인 후 이용해주세요");
                    return (window.location.href="/signin");
                  }  
              })()
          }
          {switchRoutes}
        </Container>
        <Footer/>
      </main>
    </div>
  );
}