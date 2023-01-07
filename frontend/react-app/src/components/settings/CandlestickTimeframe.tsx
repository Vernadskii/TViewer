import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CandlestickTimeframe(): JSX.Element | null {

    return (
        <>  
            <Form.Group className="mb-3" controlId="formTimeframe">
                <Form.Label>Candlestick timeframe:</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control type="number" min='1' max='3600' placeholder="time in seconds"
                        defaultValue="60" required/>
                    <InputGroup.Text id="basic-addon2">minutes</InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </>
    );
}

export default CandlestickTimeframe;