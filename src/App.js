import React, {useEffect, useState} from 'react'
import {Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import LoginPage from "./pages/LoginPage";
import {ACCESS_TOKEN} from "./constants";
import {Container} from "@mui/material";
import BottomBar from "./components/UI/BottomBar";
import {getCurrentUser} from "./API/UserServices";
import TaskDetailPage from "./pages/TaskDetailPage";
import {AuthContext} from "./context";
import TasksPage from "./pages/TasksPage";
import EditPage from "./pages/EditPage";
import LoaderIndicator from "./components/UI/LoaderIndicator";
import AlertTemplate from "react-alert-template-basic";
import {positions, Provider} from "react-alert";
import InputBase from "@mui/material/InputBase";
import SearchPage from "./pages/SearchPage";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const options = {
        timeout: 2000,
        position: positions.BOTTOM_CENTER
    };

    useEffect( () => {
        getCurrentUser()
            .then(response => {
                setCurrentUser(response.data);
                setIsAuthenticated(true);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            })
    },[]);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setIsAuthenticated(false);
        setCurrentUser(null);
    }
    if(loading)
        return (
            <LoaderIndicator/>
        );

    return (
        <Provider template={AlertTemplate} {...options}>
          <AuthContext.Provider value={{
              isAuthenticated,
              setIsAuthenticated,
          }}>
              <NavBar authenticated={isAuthenticated} onLogout={handleLogout} />
              <Container sx={{marginTop:5, marginBottom:10, minHeight:"100%"}}>
                  <Switch>
                      <Route exact path="/" component={MainPage} />
                      <Route exact path="/tasks/:id" component={TaskDetailPage} />
                      <Route exact path="/tasks" component={TasksPage} />
                      <Route exact path="/search/:query" component={SearchPage} />

                      <PrivateRoute path="/tasks/edit/:id" authenticated={isAuthenticated}
                                    component={EditPage}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/tasks/delete/:id" authenticated={isAuthenticated}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/profile" authenticated={isAuthenticated}
                                    component={ProfilePage}
                                    currentUser={currentUser}
                      />
                      <PrivateRoute path="/create" authenticated={isAuthenticated}
                                    component={CreatePage}/>
                      <Route path="/login"
                             render={(props) =>
                                 <LoginPage authenticated={isAuthenticated} {...props} />}/>
                      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                      <Route component={NotFoundPage}/>
                  </Switch>
              </Container>
          </AuthContext.Provider>
        </Provider>
      );
}

export default App
