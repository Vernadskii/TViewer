import ChartsPanel from "./info/ChartsPanel";
import Configuration from "./info/Configuration";
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export type Settings = {
    settings: {
        profile: string;
        timeframe: number;
    }
  };
  
function InfoPanel({settings}: Settings): JSX.Element | null {
    return (
        <>
        <QueryClientProvider client={queryClient}>
            <h2>InfoPanel</h2>
            <Configuration name={settings.profile}/>
            <ChartsPanel settings={settings}/>
        </QueryClientProvider>
        </>
    );
}

export default InfoPanel;