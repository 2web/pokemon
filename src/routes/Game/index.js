import { useRouteMatch, Route, Switch } from 'react-router-dom'

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';

const GamePage = () => {
  const match = useRouteMatch();
  return (
      <Switch>
          <Route path={`${match.path}/`} exact component={StartPage} />
          <Route path={`${match.path}/board`} component={BoardPage} />
          <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
  );
};

export default GamePage;