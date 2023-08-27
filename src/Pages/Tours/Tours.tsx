import css from './Tours.module.css'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
const Tours = () => {

    return (
        <main>
            <section className={css.tour_section}>
                <h2>Tour section</h2>
                <NavLink to='create-tour' className={css.button}>Create tour</NavLink>
                <NavLink to='my-tours' className={css.button}>My tours</NavLink>
                <Outlet/>
            </section>
        </main>
    )
}
export default Tours