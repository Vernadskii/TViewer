import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Profile(): JSX.Element | null {
    function handleSelect(event: string|null) {
        console.log(`Changed value ${event}`);
      }

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Text>Profile:</InputGroup.Text>
                <DropdownButton variant="outline-secondary" title="Name" id="input-group-dropdown-1" 
                onSelect={handleSelect}>
                    <Dropdown.Item eventKey="option-1">Denis</Dropdown.Item>
                    <Dropdown.Item eventKey="option-2">Daniil</Dropdown.Item>
                    <Dropdown.Item eventKey="option-3">KVF</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </>
    );
}

export default Profile;