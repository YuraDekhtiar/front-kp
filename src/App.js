import React, {useEffect, useState} from 'react'
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import Login from "./pages/Login";
import {ACCESS_TOKEN} from "./constants";
import {Container} from "@mui/material";
import BottomBar from "./components/UI/BottomBar";
import {getCurrentUser} from "./API/UserServices";
import TaskDetail from "./pages/TaskDetail";
import {AuthContext} from "./context";
import Tasks from "./pages/Tasks";
import EditPage from "./pages/EditPage";
import LoaderIndicator from "./components/UI/LoaderIndicator";
import AlertTemplate from "react-alert-template-basic";
import {positions, Provider} from "react-alert";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const options = {
        timeout: 2000,
        position: positions.BOTTOM_CENTER
    };

    useEffect( async () => {
        getCurrentUser()
            .then(response => {
                setCurrentUser(response.data);
                setIsAuthenticated(true);
            })
        setLoading(false);
    },[]);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setIsAuthenticated(false);
        setCurrentUser(null);
    }

    return (
        <Provider template={AlertTemplate} {...options}>
          <AuthContext.Provider value={{
              isAuthenticated,
              setIsAuthenticated,
          }}>
              <NavBar authenticated={isAuthenticated} onLogout={handleLogout} />
              <Container sx={{marginTop:5, marginBottom:10, minHeight:"100%"}}>
                  <Switch>
                      <Route exact path="/" component={Main} />
                      <Route exact path="/tasks/:id" component={TaskDetail} />
                      <Route exact path="/tasks" component={Tasks} />

                      <PrivateRoute path="/tasks/edit/:id" authenticated={isAuthenticated}
                                    component={EditPage}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/tasks/delete/:id" authenticated={isAuthenticated}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/profile" authenticated={isAuthenticated}
                                    component={Profile}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/create" authenticated={isAuthenticated}
                                    component={Create}/>
                      <Route path="/login"
                             render={(props) =>
                                 <Login authenticated={isAuthenticated} {...props} />}/>
                      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>

                      <Route component={NotFound}/>
                  </Switch>
              </Container>
              <BottomBar />
          </AuthContext.Provider>
        </Provider>
      );
}

export default App
