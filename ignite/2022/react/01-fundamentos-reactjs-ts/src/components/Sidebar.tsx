import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80" alt="cover" />

            <div className={styles.profile}>
                <Avatar src="https://github.com/guihendias.png" />

                <strong>John Doe</strong>
                <span>Front-end Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Edite seu perfil
                </a>
            </footer>
        </aside>
    )
}