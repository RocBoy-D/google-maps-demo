import { Wrapper } from '@googlemaps/react-wrapper';

import Map from './Map';

import API_KEY from './key';

function App() {
  return (
    <Wrapper apiKey={API_KEY}>
      <Map style={{ height: "500px" }} />
    </Wrapper>
  );
}

export default App;
