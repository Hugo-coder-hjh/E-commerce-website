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



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    //use reduce method to count the total items numbers
    useEffect (() => {
        const newCartCount = cartItems.reduce(
            //the first para is accumulator, the second para is the elemwent itself (be iterated)
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    }, [cartItems]);


    const addItemToCart = (productToAdd) => {
        //we need to pass a modified array to setCartItems
        setCartItems(addCartItem(cartItems, productToAdd));
    }; 

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};
    
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}