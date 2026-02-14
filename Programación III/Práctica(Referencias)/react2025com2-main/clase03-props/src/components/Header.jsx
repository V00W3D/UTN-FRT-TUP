import Navigation from "./Navigation"


function Header (props) {

    //console.log(props.titulo);
    return (
        <div style={{textAlign:"center"}} className="text-center bg-warning" >
        <br />
        <h1>{props.titulo}</h1>

        <br />
        <Navigation/>
        </div>
        
    )
}

export default Header