import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SettingsPanel from './components/SettingsPanel'
import InfoPanel from './components/InfoPanel';

function App(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col sm={5} md={3}><SettingsPanel/></Col>
        <Col sm={7} md={9}><InfoPanel/></Col>
      </Row>
    </Container>
  )
}

export default App;
