export class BookFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { title, minPrice, maxPrice } = this.state.filterBy
        return <section className="book-filter">
            <label htmlFor="by-title"> Name:
                <input value={title} id="by-title" onChange={this.handleChange} type="search" name="title" placeholder="by name:" />
            </label>
            <label htmlFor="by-min-price"> Min Price:
                <input value={minPrice} id="by-min-price" onChange={this.handleChange} type="number" name="minPrice" placeholder="by min price:" />
            </label>
            <label htmlFor="by-max-price"> Max Price:
            <input value={maxPrice} id="by-max-price" onChange={this.handleChange} type="number" name="maxPrice" placeholder="by max price:" />
            </label>
        </section>
    }
}