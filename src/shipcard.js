import React from 'react'
import './shipcard.css'
function Shipcard({name,image,homport}) {
    return (
        <div>
            <div className="card">
                
                <div>
                <img className="image" src={image} alt=" image not available " />
                </div>
                <div className="description">
                    <div className="inner">

                         <p className="name">{name}</p>
                         <p className="port">Port:{"  "}{homport}</p>
               
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Shipcard
