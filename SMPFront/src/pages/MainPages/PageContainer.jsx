import React from "react"
import { Outlet } from 'react-router-dom' 
import { NavBars } from "../../components/MainPage/NavBars"
import '../Content/ContentPage.css'

export const Mainpages = ()=>{


    return(<>
    
        <NavBars>
        <Outlet/>
        </NavBars >
    </>
    )

}