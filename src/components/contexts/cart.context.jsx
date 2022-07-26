import { createContext, useState, useEffect } from "react";

/*
we create a helper function to help check the productToAdd, finally return a modified cartItems array
*/
const addCartItem = (cartItems, productToAdd) => {
// if old cartItem array contains productToAdd, we should add its quantity
 const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
 );

 if (existingCartItem) {
    return cartItems.map((cartItem)=>
        cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    )
    // this function still returns cartItems array (after operation)
 }
   //else, return new array with modified cartItems, which quantity should be 1
    return ([...cartItems, {...productToAdd, quantity: 1}]);
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
     );
    //check if quantity is equal to 1, then remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //otherwise just return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem)=>
        cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //use reduce method to count the total items numbers
    useEffect (() => {
        const newCartCount = cartItems.reduce(
            //the first para is accumulator, the second para is the elemwent itself (be iterated)
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    }, [cartItems]);


    useEffect (() => {
        const newCartTotal = cartItems.reduce(
            //the first para is accumulator, the second para is the elemwent itself (be iterated)
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        //we need to pass a modified array to setCartItems
        setCartItems(addCartItem(cartItems, productToAdd));
    }; 

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }; 

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }; 


    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal};
    
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}