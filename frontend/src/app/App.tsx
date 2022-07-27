import React, {useEffect} from 'react';
import './styles/common.css';
import {useStore} from './store/store';
import {observer} from 'mobx-react-lite';
import {Route, Switch} from 'react-router-dom';
import LoadingComponent from './components/LoadingComponent';
import {ToastContainer} from 'react-toastify';
import ModalContainer from './components/modals/ModalContainer';
import HomePage from './pages/home/HomePage';
import FlightDashboard from './pages/flight/Dashboard/FlightDashboard';
import PrivateRoute from './components/PrivateRoute';
import JourneyDashboard from './pages/flight/Dashboard/JourneyDashboard';
import AccountPage from './pages/user/Account';
import DashboardPage from "./pages/user/Dashboard";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading ...' />

  return (
    <>
      <ToastContainer position='top-center' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
            <Switch>
                <PrivateRoute path='/flights' component={FlightDashboard} />
                <PrivateRoute path='/plan-journey' component={JourneyDashboard} />
                <PrivateRoute path='/account' component={AccountPage} />
                <PrivateRoute path='/dashboard' component={DashboardPage} />
            </Switch>
        </>
      )} />
    </>
  );
}

export default observer(App);
