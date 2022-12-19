import Profile from "./settings/Profile";
import CandlestickTimeframe from "./settings/CandlestickTimeframe";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SettingsPanel(): JSX.Element | null {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("Submit result from SettingsPanel")
        event.preventDefault();
      };

    return (
        <>
            <h2>SettingsPanel</h2>
            <Form onSubmit={handleSubmit}>
                <Profile/>
                <CandlestickTimeframe/>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </>
    );
}

export default SettingsPanel;