import { BookApp } from "./pages/book-app.jsx"
import { Home } from "./pages/home.jsx"
import { About } from "./pages/about.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { BookDetails } from "./pages/book-details.jsx"
import { BookAdd } from "./pages/book-add.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <main>
                <Switch>
                    <Route path="/book/:bookId" component={BookDetails} />
                    <Route path="/about" component={About} />
                    <Route path="/book" component={BookApp} />
                    <Route path="/add" component={BookAdd} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
        </section>
    </Router>
}