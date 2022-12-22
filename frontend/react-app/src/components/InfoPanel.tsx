import ChartsPanel from "./info/ChartsPanel";
import Configuration from "./info/Configuration";

function InfoPanel(): JSX.Element | null {
    return (
        <>
            <h2>InfoPanel</h2>
            <Configuration/>
            <ChartsPanel/>
        </>
    );
}

export default InfoPanel;