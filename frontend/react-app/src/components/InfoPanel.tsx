import ChartsPanel from "./info/ChartsPanel";
import Configuration from "./info/Configuration";

export type Settings = {
    settings: {
        profile: string;
        timeframe: number;
    }
  };
  
function InfoPanel({settings}: Settings): JSX.Element | null {
    return (
        <>
            <h2>InfoPanel</h2>
            <Configuration name={settings.profile}/>
            <ChartsPanel settings={settings}/>
        </>
    );
}

export default InfoPanel;