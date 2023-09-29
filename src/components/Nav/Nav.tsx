import { NavLink } from 'react-router-dom'
import css from './Nav.module.css'
import Logo from '../../images/logo.png'

const Nav: React.FC = () => {
   return <nav className={css.site_nav}>
       <NavLink to="/home" className={css.nav__button}>
          <img src={Logo} alt="logo"/>
        </NavLink>
        <div className={css.burger_btn}><span/></div>
  </nav>
}

export default Nav