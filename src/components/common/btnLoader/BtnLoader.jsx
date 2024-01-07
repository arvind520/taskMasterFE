import React from 'react'
import "./BtnLoader.css";

function BtnLoader({active}) {
  return (<>
    {active ? <div className="loader"></div> : null}
  </>
  )
}

export default BtnLoader