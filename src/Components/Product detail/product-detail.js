import './product-detail.css';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Star from '../../Assets/star.png';
import EmptyStar from '../../Assets/empty.png'
import { BagTick } from 'iconsax-react';
import Lottie from 'react-lottie';
import * as loadingData from "../../Assets/loading.json";

const ProductDetail = (props) => {

    const [data, setData] = useState([])
    const [price, setPrice] = useState([])
    const [review, setReview] = useState([])
    const [counter, setCounter] = useState(1)

    const config = {
        headers: { Authorization: (process.env.REACT_APP_TOKEN) }
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
        .finally(() => setLoading(false))
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


    //for loading animation
    const [loading, setLoading] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData.default,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
        {loading ? (
        <div style={{width:"100%", margin:"130px auto"}}><Lottie options={defaultOptions} height={150} width={150} /></div> ) :
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
        }
    </>
    )
}

export default ProductDetail;