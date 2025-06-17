import React from "react"
import { Outlet } from 'react-router-dom' 
import { NavBars } from "../../components/MainPage/NavBars"


export const Mainpages = ()=>{


    return(<>
    
        <NavBars/>
        <Outlet/>
    
    </>
    )

}