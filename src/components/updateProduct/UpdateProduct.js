import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductApiAction } from '../../store/slices/productSlice';

export default function UpdateProduct({ product, closeUpdateForm }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { title, description, price, image };
        
        await dispatch(updateProductApiAction({ id: product.id, updatedProduct }));
        closeUpdateForm(); // Call the callback to hide the form
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}
