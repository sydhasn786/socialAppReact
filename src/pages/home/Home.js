import CreatePost from "../../components/createPost/CreatePost"
import ProductList from "../../components/productList/ProductList"
import FeedListing from "../../components/feedListing/FeedListing"

export default function Home() {
    return(
        <div>
        
      
            <h1>List of products</h1>
            {/* <ProductList/> */}
            <CreatePost/>
            <FeedListing/>
          
        </div>
    )
}