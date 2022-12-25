import Chart from "./Chart";
//import type { Settings } from "../InfoPanel";
import { Api, Profiles, HttpResponse} from "../Api";
import { useState, useEffect } from 'react';


function ChartsPanel({settings}/*:Settings*/) /*:JSX.Element | null*/ {
    const [rows, setRows] = useState([]);

    async function getPlots() /*:Promise<string[]>*/{
        /**
        * @description Get plots names
        **/
        var api = new Api();
        const response = await api.profiles.getProfiles({ baseUrl: "http://localhost:30000" });
        return response.data.filter(obj => { return obj.name === settings.profile; })[0].indicators;
    };

    function updateCharts(){
        getPlots().then(plotsNames => {
            var gatherRows = [];
            console.log(plotsNames);
            for (const plotName of plotsNames) {
                var settings_copy = {};
                Object.assign(settings_copy, settings); 
                settings_copy.chartName = plotName;
                console.log(settings_copy);
                gatherRows.push(<Chart settings={settings_copy}/>)
            }
            setRows(gatherRows);
            // debugger;
        })
    }

    useEffect(() => {
        console.log(`ChartsPanel settings ${JSON.stringify(settings)}`);
        updateCharts();
      }, [settings]);

    
    return (
        <>
        {rows}
        </>
    );
}

export default ChartsPanel;