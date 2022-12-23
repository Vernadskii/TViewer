import Form from 'react-bootstrap/Form';

function Profile(): JSX.Element | null {
    function handleSelect(event: string|null) {
        // console.log(`Changed value ${event}`);
      }

    return (
        <>
            <Form.Group className="mb-3" controlId="formProfile">
                    <Form.Label>Profile:</Form.Label>
                    <Form.Select aria-label="Select profile">
                        <option value="1">Denis</option>
                        <option value="2">Daniil</option>
                        <option value="3">KVF</option>
                    </Form.Select>
            </Form.Group>
        </>
    );
}

export default Profile;