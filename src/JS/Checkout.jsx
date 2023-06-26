import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductsTunk } from '../store/productThunk'
import { productActions } from '../store/productSlice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    decrementHandler,
    incrementHandler,
}) => {
    const totalPrice = total.toFixed(2)
    const enebledDecrement = total === 0
    const disableIncrement = availableCount === orderedQuantity
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${totalPrice}</td>
            <td>
                <button
                    className={styles.actionButton}
                    disabled={disableIncrement}
                    onClick={() => incrementHandler(id, price)}
                >
                    +
                </button>
                <button
                    className={styles.actionButton}
                    disabled={enebledDecrement}
                    onClick={() => decrementHandler(id, price)}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductsTunk())
    }, [])
    const { products, isLoading, error, totalPrice } = useSelector(
        (state) => state.product
    )
    const handleIncrement = (id, price) => {
        dispatch(productActions.incrementPrice(price))
        dispatch(productActions.increment(id))
    }
    const handleDecrement = (id, price) => {
        dispatch(productActions.decrementPrice(price))
        dispatch(productActions.decrement(id))
    }
    const price = totalPrice.toFixed(2)
    let discount = 0

    if (totalPrice > 1000) {
        discount = totalPrice * 0.3
    }
    const count = discount.toFixed(2)
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && <LoadingIcon />}
                <h4 style={{ color: 'red' }}>{error}</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <Product
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                availableCount={item.availableCount}
                                price={item.price}
                                orderedQuantity={item.quantity}
                                total={item.total}
                                incrementHandler={handleIncrement}
                                decrementHandler={handleDecrement}
                            />
                        ))}
                    </tbody>
                </table>
                <h2>Order summary</h2>
                <p>Discount: $ {count}</p>
                <p>Total: $ {price}</p>
            </main>
        </div>
    )
}

export default Checkout
