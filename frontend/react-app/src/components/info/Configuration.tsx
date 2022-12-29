import React, { useEffect  } from 'react';

interface Name {
    name: string
 }

function Configuration({name} :Name): JSX.Element | null {
    
    useEffect(() => {
        console.log("Test config update");
      });

    return (
        <>  
            <p>Text configuartion {name}</p>
        </>
    );
}

export default Configuration;