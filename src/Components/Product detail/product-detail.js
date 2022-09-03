import './product-detail.css';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Star from '../../Assets/star.png';
import EmptyStar from '../../Assets/empty.png'
import { BagTick } from 'iconsax-react';

const ProductDetail = (props) => {

    const [data, setData] = useState([])
    const [price, setPrice] = useState([])
    const [review, setReview] = useState([])
    const [counter, setCounter] = useState(1)

    const config = {
        headers: { Authorization: `Bearer b1293253ea005770dc8c28f9b9b30f289c25cc72d3a60c7c4b8cedb26caafdd0622c5394ffc6d083feaf3cbce9126383c04f9091b47412c15ff3dd136274119d8d3850e5b26f0e6a7a70449a5135823d35ccda82e61e79d83ddb5dc40c8fe47b3250bc7e64a14ea8aec1c114fc3f4a0cff4cbbb93ef1e3913efd645300cefe92` }
    };

    const { id } = useParams()

    const fetchData = () => {
        axios
        .get(`https://cc-quiz-api.herokuapp.com/api/products/${id}`, config)
        .then ((res) => {
            const datas = res.data.data.attributes
            setData(datas)

            const price = () => ({
                real: ((datas.price).toLocaleString("en-US", {minimumFractionDigits: 2})),
                discount: (Math.round((datas.price)+(datas.price)*0.0417)).toLocaleString("en-US", {minimumFractionDigits: 2}),
            })
            setPrice(price)

            setReview(datas.review)
        })
        .catch ((err) => {
            alert(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const minus = () => {
        if (counter > 1) {
            setCounter(counter-1)
        } else {
            setCounter(1)
        }
    }
    const plus = () => {
        setCounter(counter+1)
    }

    const dataForCart = {
        id: id,
        name: data.name,
        price: data.price,
        quantity: counter,
        img: data.image_url,
    }

    //for update a rating star (force re-rendering)
    const [starKeyForce, setStarKeyForce] = useState(0)

    useEffect(() => {
        setStarKeyForce(prev => prev + 1)
    }, [review.rating])


    return (
        <div className='item-container'>
            <div className='item-display'>
                <img className='item-img' src={data.image_url} alt="item-img" />
            </div>
            <div className='item-detail'>
                <div className='item-name'>{data.name}</div>
                <div className='review-item'>
                    <ReactStars
                        count={5}
                        value={review.rating}
                        size={12}
                        activeColor="#FFB647"
                        edit={false}
                        emptyIcon={<img src={EmptyStar} alt='empty-star1' />}
                        filledIcon={<img src={Star} alt='star1' />}
                        key={starKeyForce}
                    />
                    <div className='item-review'>({review.number} reviews)</div>
                </div>
                <div className='item-des'>{data.description}</div>
                <div>
                    <div className='text-price'>Price</div>
                    <div className='price-item'>
                        <div className='cost'>{price.real}</div>
                        <div className='discount'>{price.discount}</div>
                    </div>
                </div>
                <div className='quan-item'>
                    <div className='quan-text'>Quantity: </div>
                    <div className='myCounter'>
                        <button className='minus' onClick={() => minus()} >-</button>
                        <div className='counter-value'>{counter}</div>
                        <button className='plus' onClick={() => plus()} >+</button>
                    </div>
                </div>
                <button className='cart-btn' onClick={() => props.onAdd(dataForCart)} >
                    <BagTick
                        size="24"
                        color="#F9F9F9"
                        />
                    <p className='add-text'>ADD TO CART</p>
                </button>
            </div>
        </div>
    )
}

export default ProductDetail;