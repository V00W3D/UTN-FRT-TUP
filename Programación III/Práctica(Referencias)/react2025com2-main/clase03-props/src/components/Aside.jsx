import React from 'react'

const Aside = ({ saludo ,gatitos}) => {
    console.log(gatitos);

    // for (const minino of gatitos) {
    //     docymenget()
    // }



    return (
        <div>
            <br />
            <h2>Este es el componnete ASIDE</h2>
            <br />
            <h4>Saludo: {saludo}</h4>
            <br />
            <ul>

            {gatitos.map((gato,index)=><li key={index}>{gato}</li>)}
            </ul>



            <br />
        </div>

        // APP -> Home -> Main -> Aside




    )
}

export default Aside