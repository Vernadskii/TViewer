import Chart from "./Chart";
import type { Settings } from "../InfoPanel";

function ChartsPanel({settings}: Settings): JSX.Element | null {
    console.log(`ChartPanel settings ${JSON.stringify(settings)}`);
    return (
        <>
        <Chart/>
        <Chart/>
        </>
    );
}

export default ChartsPanel;