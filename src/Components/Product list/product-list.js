import './product-list.css';
import { RowVertical } from 'iconsax-react';
import { Element3 } from 'iconsax-react';
import Star from '../../Assets/star.png';
import EmptyStar from '../../Assets/empty.png'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useState, useEffect } from 'react';


const ProductList = () => {

    const [data, setData] = useState([])
    const [total, setTotal] = useState()

    const config = {
        headers: { Authorization: `Bearer b1293253ea005770dc8c28f9b9b30f289c25cc72d3a60c7c4b8cedb26caafdd0622c5394ffc6d083feaf3cbce9126383c04f9091b47412c15ff3dd136274119d8d3850e5b26f0e6a7a70449a5135823d35ccda82e61e79d83ddb5dc40c8fe47b3250bc7e64a14ea8aec1c114fc3f4a0cff4cbbb93ef1e3913efd645300cefe92` }
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
    }

    console.log((data))

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="product-container" >
            <div className='product-header'>
                <div className='total'>Products ({total})</div>
                <div>
                    <Element3 size="32" color="black"/>
                    <RowVertical size="32" color="black"/>
                </div>
            </div>
            <div className='card-container' >
            {data.map( (product) => (
                <div className='product-card' key={product.id} >
                    <img className='product-img' src={product.img} alt='product-img' />
                    <div className='card-detail-header'>
                        <img className='product-logo' src={product.logo_img} alt='product-logo' />
                        <h5 className='product-name'>{product.name}</h5>
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
        </div>
    )
}

export default ProductList;