import Profile from "./settings/Profile";
import CandlestickTimeframe from "./settings/CandlestickTimeframe";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function SettingsPanel({onSubmit}: any): JSX.Element | null {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        let profile_name = (event.currentTarget[0] as HTMLSelectElement).options[
            (event.currentTarget[0] as HTMLSelectElement).selectedIndex].text;
        let timeframe_value = (event.currentTarget[1] as HTMLInputElement).value;
        onSubmit({ profile: profile_name, timeframe: timeframe_value });
        event.preventDefault();
      };

    return (
        <>
            <h2>SettingsPanel</h2>
            <QueryClientProvider client={queryClient}>
                <Form onSubmit={handleSubmit}>
                    <Profile/>
                    <CandlestickTimeframe/>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </QueryClientProvider>
        </>
    );
}


export default SettingsPanel;