import './App.css';
import { client } from './utils/api';
import {gql} from 'graphql-request';
import Header from './components/Header';

function App() {
  const query = gql`
    {
      items {
        title
        description
        image {
          url
        }
      }
    }
  `

  client.request(query)
    .then((data) => {
      console.log(data);
    })

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
