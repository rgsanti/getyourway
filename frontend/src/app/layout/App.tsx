import React, {useEffect} from 'react';
import './styles.css';
import {useStore} from '../store/store';
import {observer} from 'mobx-react-lite';
import {Route, Switch} from 'react-router-dom';
import LoadingComponent from './LoadingComponent';
import {ToastContainer} from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../features/Home/HomePage';
import FlightDashboard from '../features/Flight/Dashboard/FlightDashboard';
import PrivateRoute from './PrivateRoute';
import JourneyDashboard from '../features/Flight/Dashboard/JourneyDashboard';

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
            </Switch>
        </>
      )} />
    </>
  );
}

export default observer(App);
