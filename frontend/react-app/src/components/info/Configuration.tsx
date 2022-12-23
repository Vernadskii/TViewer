interface Name {
    name: string
 }

function Configuration({name}: Name): JSX.Element | null {
    console.log("Configuration. Name is " + `${name}`);
    return (
        <>  
            <p>Text configuartion {name}</p>
        </>
    );
}

export default Configuration;