import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProductApiAction } from '../../store/slices/productSlice';
import UpdateProduct from  '../updateProduct/UpdateProduct';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [editingProductId, setEditingProductId] = useState(null);
    const products = useSelector(store => store.productSlice.products);
    const dispatch = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const onClickDeleteProduct = (id) => {
        dispatch(deleteProductApiAction(id));
    };

    const onClickUpdateProduct = (id) => {
        setEditingProductId(id);
    };

    const closeUpdateForm = () => {
        setEditingProductId(null);
    };

    return (
        <div>
            <Link to={"/products"}>ADD Product</Link>
            <div>Product List</div>

            {products?.map(product => (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <img style={{ width: "100px", padding: '10px' }} src={product.image} alt={product.title} />
                    </div>
                    <div>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button onClick={() => onClickDeleteProduct(product.id)}>Delete</button>
                        <button onClick={() => onClickUpdateProduct(product.id)}>Update</button>
                        <hr />
                    </div>
                    {editingProductId === product.id && (
                        <UpdateProduct product={product} closeUpdateForm={closeUpdateForm} />
                    )}
                </div>
            ))}
        </div>
    );
}
