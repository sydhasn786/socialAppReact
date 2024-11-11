import React from 'react'
import AddProduct from '../../components/addProduct/AddProduct'
import {Link} from 'react-router-dom'
export default function Products() {
  return (
    <div>
        <Link to={"/"}>Home</Link>
        <AddProduct/></div>
  )
}
