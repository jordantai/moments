import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import ImageList from './components/ImageList';

function App() {

  return (
    <div className="App">
      <Header />
      <MainWrapper>
        <ImageList />
      </MainWrapper>  
    </div>
  );
}

const MainWrapper = styled.main`
  list-style: none;
  display: flex;
  justify-content: center;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default App;
