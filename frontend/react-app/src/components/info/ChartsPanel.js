import Chart from "./Chart";
//import type { Settings } from "../InfoPanel";
import { useProfiles } from '../API/queries';
import { useState, useEffect } from 'react';


function ChartsPanel({settings}/*:Settings*/) /*:JSX.Element | null*/ {
    const [rows, setRows] = useState([]);

    const { isLoading, error, data} = useProfiles();
    
    useEffect(() => {
        if (data) {
            var plotsNames = data.filter(obj => { return obj.name === settings.profile; })[0].indicators;
            var gatherRows = [];
            for (const plotName of plotsNames) {
                var settings_copy = {};
                Object.assign(settings_copy, settings); 
                settings_copy.chartName = plotName;
                console.log(settings_copy);
                gatherRows.push(<Chart settings={settings_copy}/>)
            }
            setRows(gatherRows);
        }
      }, [settings]
    )

    if (isLoading) return <p>'Loading...'</p>;
    if (error) return <p>'An error has occurred'</p>;

    return (
        <>
        {rows}
        </>
    );
}

export default ChartsPanel;