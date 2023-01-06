import React, { useEffect  } from 'react';

interface Name {
    name: string
 }

function Configuration({name} :Name): JSX.Element | null {
    return (
        <>  
            <p>Text configuartion {name}</p>
        </>
    );
}

export default Configuration;