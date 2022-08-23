import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from './../services/event-bus.service.js';

export class BookAdd extends React.Component {

    state = {
        books: null

    }

    onGoogleSearch = (ev) => {
        ev.preventDefault()
        const input = ev.target[0].value
        bookService.getGoogleBookAPI(input).then(res => this.setState({ books: res }))
    }

    onAddNewBook = (book) => {
        bookService.addGoogleBook(book)
        this.props.history.push("/book")
        showSuccessMsg('Book Added')
    }

    render() {
        const { books } = this.state
        return <section className="book-add main-layout">
            <h2>Add New Book</h2>
            <form onSubmit={this.onGoogleSearch}>
                <label htmlFor="search"> Search Book:
                    <input type="search" placeholder="search book" name="bookName" id="search" />
                    <button>Go</button>
                </label>
            </form>
            {books &&<ul className="search-book-list">
                {books.map(book => {
                    return <li key={book.id}>
                        {book.title}
                        <button onClick={() => this.onAddNewBook(book)}>Add</button>
                    </li>
                })}
            </ul>}
        </section>
    }
}