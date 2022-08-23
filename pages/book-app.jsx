import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./book-details.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy).then(books => this.setState({ books: books }))
    }

    // onSelectBook = (id) => {
    //     bookService.getBookById(id)
    //         .then(book => this.setState({ selectedBook: book }))
    // }

    onGoBack = () => {
        this.setState({ selectedBook: null })

        this.setState({ filterBy: null }, () => {
            this.loadBooks()
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }




    render() {
        const { books } = this.state
        return (
            <section className="book-app main-layout">
                <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <BookList onSelectBook={this.onSelectBook} books={books} />
            </section>
        )
    }
}
