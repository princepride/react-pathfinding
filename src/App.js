import './App.css';
import GrideNodes from './Component/GrideNodes';
import AlgorithmsTitle from './Component/AlgorithmTitle';
import MyNavBar from './Component/MyNavBar';
import MainText from './Component/MainText';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <MyNavBar />
      <MainText />
      <AlgorithmsTitle />
      <GrideNodes />
      </Provider>
    </div>
  );
}

export default App;

