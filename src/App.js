import './App.css';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Header from './components/Header';
import ItemList from './components/ItemList';
import Item from './components/Item';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      
      <Header />
      <MainWrapper>
        <Router>
          <ItemList path="/" />
          <Item path="moment/*slug" />
        </Router>
      </MainWrapper> 
      <Footer />
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
