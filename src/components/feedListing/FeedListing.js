import React from 'react'
import Button from '../button/Button'

export default function FeedListing() {
    const handleClick = () =>{console.log("clicked")};
  return (
    <div>
        <h1>Feed Listing</h1>
        <Button title = "Get Post" onClickHandler = {() => {handleClick()}}/>
    </div>
  )
} 
