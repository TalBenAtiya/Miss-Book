import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";


export class ReviewAdd extends React.Component {

    state = {
        review: {
            userName: 'Book\'s Reader',
            date: new Date(),
            rating: null,
            text: null,
        }
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        const date = this.getDate()
        this.setState((prevState) => ({
            review: { ...prevState.review, date }
        }), () => {
            const { review } = this.state
            const { bookId } = this.props
            bookService.addReview(review, bookId)
            this.props.onAddReview(review)
        })
    }

    getDate = () => {
        const dateObj = new Date();
        const month = dateObj.getUTCMonth() + 1
        const day = dateObj.getUTCDate()
        const year = dateObj.getUTCFullYear()
        const date = `${day}/${month}/${year}`
        return date
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            review: { ...prevState.review, [field]: value }
        }))
    }

    render() {
        const { reviews } = this.props
        const { review } = this.state
        return <section className="review-add">
            <div>
                <h2>Reviews:</h2>
                {reviews.map(review => <article key={utilService.makeId()}>
                    <h3>User Name: {review.userName}</h3>
                    <h5>Date: {review.date}</h5>
                    <p>{review.text}</p>
                    <h5>Rating: {review.rating}</h5>
                    <hr />
                </article>
                )}
            </div>

            <form onSubmit={this.onAddReview} className="review-input">
                <h2>Add Review</h2>
                <label htmlFor="user-name">Name:
                    <input onChange={this.handleChange} type="text" name="userName" id="user-name" value={review.userName} />
                </label>
                <label htmlFor="rate">Rate:
                    <select onChange={this.handleChange} id="rate" name="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label htmlFor="review">Review:
                    <input onChange={this.handleChange} rows="3" cols="30" type="text" name="text" id="review" placeholder="text review" />
                </label>
                <button>Send Review</button>
            </form>
        </section>
    }
}