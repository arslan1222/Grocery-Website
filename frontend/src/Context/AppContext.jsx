import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.VITE_BACKEND_URI;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = '$';
    const backend = "http://localhost:8000";

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState([]);

    const fetchSeller = async() => {
        try {
            const {data} = await axios.get(backend + "/api/seller/is-auth");

        if(data.success) {
            setIsSeller(true);
        } else {
            setIsSeller(false)
        }
        } catch (error) {
            setIsSeller(false)
        }
    }

    const fetchUser = async() => {
        try {
            const {data} = await axios.get(backend + "/api/user/is-auth");

            console.log(data.success);
            

            if(data.success) {
                setUser(data.user);
                
                setCartItems(data.user.cartItems);
            } 
        } catch (error) {
            setUser(null)
        }
    }


    const fetchProducts = async () => {

        try {
            const { data } = await axios.get(backend + "/api/product/list");

            if(data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

        // setProducts(dummyProducts)
    }

    // Add products to cart

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
            cartData[itemId] += 1; 
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Added to Cart!")
    }

    // Update cart items
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);

        toast.success("Cart Updated!")
    }

    // Remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            cartData[itemId] -=1;
            
            if(cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }

        toast.success("Removed from Cart!")
        setCartItems(cartData)
    }

    // Calculate cart item counts

  const getCartCounts = () => {
    let totalCount = 0;

    for(const items in cartItems) {
      totalCount += cartItems[items];
    }
    return totalCount;
  }

  // calculate cart total amounts

  const getCartAmounts = () => {
    let totalAmount = 0;
    for(const items in cartItems) {
      let itemInfo = products.find((product)=> product._id === items);

      if(cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  }

    useEffect(()=>{
        fetchProducts();
        fetchSeller();
        fetchUser();
    }, []);

    useEffect(()=>{
        const updateCart = async () => {
            try {
                const {data} = await axios.post(backend + "/api/cart/update", {
                    userId: user._id,
                    cartItems
                });
    
                console.log(data.success);
    
                if(!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    
        if(user) {
            updateCart();
        }
    }, [cartItems])
    

    const value = {
        currency, navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin,
        products, setProducts, cartItems,
        addToCart, updateCartItems, removeFromCart,
        searchQuery, setSearchQuery,
        getCartCounts, getCartAmounts,
        axios, backend, fetchProducts, setCartItems
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export const useAppContext = () => {
    return useContext(AppContext);
}