import './cart.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Cart = () => {
    const [data, setData] = useState([])


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
        })
        .catch ((err) => {
            alert(err)
        })
    }
    

    useEffect(() => {
        fetchData()
    }, [])

    console.log(data[0])

    return (
        <div className='cart-container'>
            <h2 className='cart-header-text'>Cart</h2>
            <table>
                <tr className='table-header'>
                    <th style={{width: "70%", textAlign: "left"}}>PRODUCT NAME</th>
                    <th style={{width: "15%"}}>PRICE</th>
                    <th style={{width: "15%"}}>QUANTITY</th>
                    <th style={{width: "auto", textAlign: "right"}}>TOTAL</th>
                </tr>
                <tr className='table-data'>
                    <td className='cart-img-name'><img className='cart-img' src="https://fs.chomchob.com/file/image?path=/admin/upload/2018-02-13/f8c6966e-f5b9-4452-9b6e-4e26608e3d18" /><span className='cart-name'>Garmin vívosport</span></td>
                    <td>1080</td>
                    <td>1</td>
                    <td>7,191.00</td>
                </tr>
                <tr className='table-data'>
                    <td className='cart-img-name'><img className='cart-img' src="https://fs.chomchob.com/file/image?path=/admin/upload/2018-02-13/f8c6966e-f5b9-4452-9b6e-4e26608e3d18" /><span className='cart-name'>Garmin vívosport</span></td>
                    <td>1080</td>
                    <td>1</td>
                    <td>7,191.00</td>
                </tr>
            </table>
            <div className='checkout-container'>
                <div className='total-text'>Subtotal (2 Product): <span className='total-cost'>13,690.00</span></div>
                <button className='checkout'>Proceed to checkout</button>
            </div>
        </div>
    )
}

export default Cart;