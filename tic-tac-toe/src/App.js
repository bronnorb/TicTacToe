import Board from './components/game';
import {GameWin} from './components/gameWin';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Board} />
      <Route path='/:player' component={GameWin}/>
      
      </Switch>
  );
}

export default App;
