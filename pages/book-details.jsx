import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"
import { ReviewAdd } from "../cmps/review-add.jsx"
const  { Link } = ReactRouterDOM


export class BookDetails extends React.Component {


    state = {
        book: null,
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId)
            .then((book) => {
                if (!book) return this.onGoBack()
                this.setState({ book })
            })
    }

    bookLength = () => {
        const { book } = this.state
        if (book.pageCount >= 500) return `${book.pageCount} Pages, Long Reading.`
        else if (book.pageCount >= 200) return `${book.pageCount} Pages, Decent Reading.`
        else if (book.pageCount < 100) return `${book.pageCount} Pages, Light Reading.`
        else return `${book.pageCount} Pages.`
    }

    bookRelease = () => {
        const { book } = this.state
        const currYear = new Date().getFullYear()
        if (book.publishedDate <= (currYear - 10)) return 'Veteran Book'
        if (book.publishedDate >= (currYear - 1)) return 'New Book!'
    }

    priceClass = () => {
        const { book } = this.state
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 50) return 'green'
        else return ''
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onAddReview = (review) => {
        this.setState((prevState) => ({
            review: { ...prevState, reviews: prevState.book.reviews.unshift(review) }
        }))
    }

    render() {
        const { book } = this.state
        if (!book) return <div></div>
        const nextBookId = bookService.getNextBookId(book.id)
        const prevBookId = bookService.getPrevBookId(book.id)

        return <section className="book-details main-layout">
            <div className="details-container">
                <button onClick={this.onGoBack}><img src="./assets/img/X.png" alt="x img" /></button>
                {book.listPrice.isOnSale && <div className="sale-modal">
                    <img src="./assets/img/sale.png" alt="sale img" />
                </div>}
                <h2>{book.title}</h2>
                <h3>{book.subtitle}</h3>
                <h4>{book.authors}</h4>
                <div>
                    <img src={book.thumbnail} />
                </div>
                <h4 className={this.priceClass()}>{book.listPrice.amount}{utilService.getCurrency(book.listPrice.currencyCode)} </h4>
                <p>{book.description}</p>
                <h4>{this.bookLength()}</h4>
                <h4>{ }{this.bookRelease()}</h4>
                <div className="pages-btn">
                <Link to={`/book/${prevBookId}`}><button>Previous Book</button></Link>
                <Link to={`/book/${nextBookId}`}><button>Next Book</button></Link>
                </div>
                <ReviewAdd bookId={book.id} reviews={book.reviews} onAddReview={this.onAddReview} />
            </div>
        </section>
    }
}