import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import ContactPage from './routes/Contact';
import AboutPage from './routes/About';
import NotFoundPage from './routes/NotFound';

import cn from 'classnames';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import s from './style.module.css';

const App = () => {
  const matchRoot = useRouteMatch('/');
  const matchHome = useRouteMatch('/home');
  const match = matchRoot.isExact || matchHome ;
  return (
      <Switch>
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!match} />
            <div className={cn(s.wrap, {
              [s.isHomePage] : match
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/about" component={AboutPage} />
                <Route render={() => (
                  <Redirect to="/404"/>
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
  )
};

export default App;