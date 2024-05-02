import { Product, CartItem } from "@/types";
import { randomUUID } from "expo-crypto";
import { useContext, createContext, PropsWithChildren, useState } from "react";

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) =>void
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
}

const cartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0
});

const CartProvider = ({ children } : PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {

        const existingItem = items.find((item) => item.product === product && item.size === size);
        
        if(existingItem) {
            updateQuantity(existingItem.id, 1);
            return
        }
        const newCartItem: CartItem = {
            id : randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };
        setItems([ newCartItem, ...items])
        // console.log(items)
    }
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
          items
            .map((item) =>
              item.id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount }
            )
            .filter((item) => item.quantity > 0)
        );
      };

    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <cartContext.Provider value={{items, addItem, updateQuantity, total}}>
            {children}
        </cartContext.Provider>
    )
}

export default CartProvider
export const useCart = () => useContext(cartContext)