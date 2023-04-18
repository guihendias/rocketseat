import styled from './Header.module.css'

import igniteLogo from '../assets/ignite.svg'

export function Header() {
    return (
        <header className={styled.header}>
            <img src={igniteLogo} alt="Ignite" />
            <strong>
                Ignite Feed
            </strong>
        </header>
    )
}