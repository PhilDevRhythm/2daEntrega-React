import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import ProductCard from './ProductCard'
import prodList from '../data/prodList'

const ProductList = ({item, handleClick}) => {

    const [items, setItems] = useState([])
    
    useEffect(() => {

        getProducts()
            .then(res => {

                console.log(res);
                setItems(res)
            })
            .catch(err => { console.log(err) })
    }, [])

    const getProducts = () => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(prodList.products)
            }, 2000)
        })
    }
console.log(prodList.products);



    return (
        <><Loading />
            <div className='flex flex-wrap col-2'>
                {items.map(item => <ProductCard key={item.id} item={item} handleClick={handleClick} />)}
            </div>
        </>
    )
}

export default ProductList