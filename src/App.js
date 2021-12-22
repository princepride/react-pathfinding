import './App.css';
import GrideNodes from './Component/GrideNodes';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <GrideNodes />
      </Provider>
    </div>
  );
}

export default App;
