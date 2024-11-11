import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addProduct,addProductApiAction } from '../../store/slices/productSlice';
export default  function AddProduct() {
   
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");
    const [category, setCategory] = useState("");
    
    const onClickAddProduct = () => {

        const product = {title, price, description, image, category};
        console.log("product to be adding", product)
        dispatch(addProductApiAction(product));
    }


    return (
    <div>
        <h1>AddProduct</h1>
    <form >
   <input type="text" name="title" placeholder='Enter title' onChange={(e) => setTitle(e.target.value)}/>
    <input type='text' name='price' placeholder='Enter price' onChange = {(e)=>setPrice(e.target.value)}/>
    <input type='text' name='description' placeholder='Enter description' onChange = {(e)=>setDescription(e.target.value)}/>
    <input type='text' name='category' placeholder='Enter category'onChange = {(e)=>setCategory(e.target.value)}/>
    </form>
    <button onClick={onClickAddProduct}>Add Product</button>
    </div>
  )
}
