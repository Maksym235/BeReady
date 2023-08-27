import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import css from './Layout.module.css'

export const Layout = () => {

    return <>
        <header className={css.header}>
            <NavLink to='/home' className={css.nav__button}>Home</NavLink>
             <NavLink to='/tours' className={css.nav__button}>tours</NavLink>
            <br />
            Header
        </header>
        <Outlet/>
    </>
}