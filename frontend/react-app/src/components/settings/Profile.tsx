import Form from 'react-bootstrap/Form';
import { useProfiles } from '../API/queries';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function Profile(): JSX.Element | null  {
    const { isLoading, error, data} = useProfiles();
    if (isLoading) return <p>'Loading...'</p>;
    if (error) return <p>'An error has occurred'</p>;

    const namesFromData = () => {
        if (data) return data.map(profile => <option key={profile.name}>{profile.name}</option>);
    } 

    return (
        <>
        <QueryClientProvider client={queryClient}>
            <Form.Group className="mb-3" controlId="formProfile">
                    <Form.Label>Profile:</Form.Label>
                    <Form.Select aria-label="Select profile">
                        {namesFromData()}
                    </Form.Select>
            </Form.Group>
        </QueryClientProvider>
        </>
    );
}

export default Profile;