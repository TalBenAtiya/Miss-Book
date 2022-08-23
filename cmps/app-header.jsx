import { UserMsg } from './user-msg.jsx';
const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {

    return <header className="main-header">
        <div className="app-header  main-layout">
            <div  onClick={() => {
                props.history.push("/")
            }} className="logo-container">
            <img src="./assets/img/logo.png"/>
            <h3>Miss Book</h3>
            </div>

            <nav>
                <NavLink exact to="/">Home</NavLink> |
                <NavLink to="/book">Books Collection</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/add">Add Books</NavLink>
            </nav>
        </div>
            <UserMsg />
    </header>
}

export const AppHeader = withRouter(_AppHeader)