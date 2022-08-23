import { utilService } from "../services/util.service.js"

const {Link} = ReactRouterDOM

export function BookPreview({ book }) {

   

    return <Link to={"/book/" + book.id}>
    <div className="book-preview">
       <h3>{book.title}</h3>
       <div>
        <img src={book.thumbnail} alt="book img" />
       </div>
       <h3>{book.listPrice.amount}{utilService.getCurrency(book.listPrice.currencyCode)}</h3>
    </div>
    </Link>
} 