import { Routes, Route } from "react-router-dom"

import './App.css'
import { Layout } from "./Pages/Layout/Layout"
import Home from "./Pages/Home/Home"
import  Tours  from "./Pages/Tours/Tours"
import MyTours from "./Pages/MyTours/MyTours"
import CreateTour from "./Pages/CreateTour/CreateTour"

export default App

function App() {

    return (
        <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Home />} />
                <Route path='tours' element={<Tours />}>
                    <Route path='create-tour' element={<CreateTour />} /> 
                    <Route path='my-tours' element={<MyTours />} /> 
                </Route>
                <Route path='*' element={<Home/>} />
                </Route>
    </Routes>
    )
}
