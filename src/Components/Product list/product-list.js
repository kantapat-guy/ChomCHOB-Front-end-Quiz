import './product-list.css';
import { RowVertical } from 'iconsax-react';
import { Element3 } from 'iconsax-react';
import Star from '../../Assets/star.png';
import EmptyStar from '../../Assets/empty.png'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Lottie from 'react-lottie';
import * as loadingData from "../../Assets/loading.json";


const ProductList = () => {

    const [data, setData] = useState([])
    const [total, setTotal] = useState()
    const [show, setShow] = useState(true)

    const config = {
        headers: { Authorization: (process.env.REACT_APP_TOKEN) }
    };


    const fetchData = () => {
        axios
        .get('https://cc-quiz-api.herokuapp.com/api/products?populate=brand', config)
        .then ((res) => {
            const datas = res.data.data
            const allData = datas.map((data) => ({
                id: data.id,
                name: data.attributes.name,
                img: data.attributes.image_url,
                des: data.attributes.description,
                price: data.attributes.price,
                review_nums: data.attributes.review.number,
                rating: data.attributes.review.rating,
                brand: data.attributes.brand.data.attributes.name,
                logo_img: data.attributes.brand.data.attributes.logo_url,
            }))
            setData(allData)
            setTotal(res.data.meta.pagination.total)
        })
        .catch ((err) => {
            alert(err)
        })
        .finally(() => setLoading(false))
    }

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
    

    useEffect(() => {
        fetchData()
    }, [])

    const showItem = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    return (
        <div className="product-container" >
            <div className='product-header'>
                <div className='total'>Products ({total})</div>
                <label className="switch">
                    <div className='switch-container' >
                        <Element3 className='grid-btn' size="24" color="black" />
                        <RowVertical className='list-btn' size="24" color="black" />
                    </div>

                    <input type="checkbox"  onClick={() => showItem()}/>
                    <span className="slider"></span>
                </label>
            </div>
            {loading ? (
            <div style={{width:"700px", margin:"0px auto"}}><Lottie options={defaultOptions} height={150} width={150} /></div> ) : null }
            {show ? 
            <div className='card-container' >
            {data.map( (product) => (
                <div className='product-card' key={product.id} >
                    <Link style={{textDecoration: "none"}} to={`/product/${product.id}`}><img className='product-img' src={product.img} alt='product-img' /></Link>
                    <div className='card-detail-header'>
                        <img className='product-logo' src={product.logo_img} alt='product-logo' />
                        <Link style={{textDecoration: "none"}} to={`/product/${product.id}`}><h5 className='product-name'>{product.name}</h5></Link>
                    </div>
                    <div className='card-detail'>
                        <div className='price-container'>
                            <div className='price-text'>Price</div>
                            <div className='price'>{(product.price).toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
                        </div>
                        <div className='review-container'>
                            <div className='review-text'>Reviews ({product.review_nums} reviews)</div>
                            <ReactStars
                                count={5}
                                value={product.rating}
                                size={12}
                                activeColor="#FFB647"
                                edit={false}
                                emptyIcon={<img src={EmptyStar} alt='empty-star' />}
                                filledIcon={<img src={Star} alt='star' />}
                            />
                        </div>
                    </div>
                </div>
                ))}
            </div>
            : 
            <div className='list-container'>
                {data.map( (product) => (
                    <div className='list-card' key={product.id} >
                        <Link style={{textDecoration: "none"}} to={`/product/${product.id}`}><img className='list-img' src={product.img} alt='product-img' /></Link>
                        <div className='list-content'>
                            <Link style={{textDecoration: "none"}} to={`/product/${product.id}`}><h5 className='list-name'>{product.name}</h5></Link>
                            <div className='list-des'>{product.des}</div>
                        </div>
                        <div className='list-detail'>
                            <div className='list-price'>{(product.price).toLocaleString("en-US", {minimumFractionDigits: 2})}</div>
                            <ReactStars
                                count={5}
                                value={product.rating}
                                size={10}
                                activeColor="#FFB647"
                                edit={false}
                                emptyIcon={<img src={EmptyStar} alt='empty-star' />}
                                filledIcon={<img src={Star} alt='star' />}
                            />
                            <div className='list-review'>Reviews ({product.review_nums} reviews)</div>
                        </div>
                    </div>
                    ))}
            </div> }
        </div>
    )
}

export default ProductList;