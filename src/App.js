import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

import HomePage from './routes/Home';
import GamePage from './routes/Game';
import ContactPage from './routes/Contact';
import AboutPage from './routes/About';
import NotFoundPage from './routes/NotFound';

import cn from 'classnames';
import s from './style.module.css';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';


const App = () => {
  const location = useLocation();
  const isExact = location.pathname === "/" || location.pathname === "/home";
  return (
      <Switch>
        <Route>
          <>
            <MenuHeader bgActive={!isExact} />
            <div className={cn(s.wrap, {
              [s.isHomePage] : isExact
            })}>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/game" component={GamePage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/404" component={NotFoundPage} />
              <Route render={() => (
                <Redirect to="/home"/>
              )} />
              
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
  )
};

export default App;