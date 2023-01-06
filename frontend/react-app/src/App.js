import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SettingsPanel from './components/SettingsPanel'
import InfoPanel from './components/InfoPanel';
import { useState } from 'react';

function App(){
  const [settings, setSettings] = useState([{ profile: "test Profile", timeframe: undefined }]);

  function handleSubmit(data) {
    setSettings(data);
    console.log(`App. settings is ${settings.profile}`);
  }

  return (
    <Container fluid className="vh-100">
      <Row>
        <Col sm={5} md={3} xl={2}><SettingsPanel onSubmit={handleSubmit}/></Col>
        <Col sm={7} md={9} xl={10}><InfoPanel settings={settings}/></Col>
      </Row>
    </Container>
  )
}

export default App;
