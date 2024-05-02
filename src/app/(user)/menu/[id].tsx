import {
   View,
   Text,
   StyleSheet,
   Image,
   Pressable,
 } from 'react-native';
 import React, { useState } from 'react';
 import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
 import Button from '../../../components/Button';
 import { useCart } from '@/providers/CartProvider';
 import { PizzaSize } from '../../../types';
import {logo} from '@assets/logo.png'
import { useProduct } from '@/api/products';
import { ActivityIndicator } from 'react-native';
 
 const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];
 
 const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
   return (
     <View style={styles.container}>
       <Stack.Screen options={{ title: product.name }} />
       <Image
         source={{ uri: product.image || logo }}
         style={styles.image}
         resizeMode="contain"
       />
       
       <Text style={styles.subtitle}>Select size</Text>
       <View style={styles.sizes}>
         {sizes.map((size) => (
           <Pressable
             onPress={() => setSelectedSize(size)}
             key={size}
             style={[
               styles.size,
               {
                 backgroundColor: size === selectedSize ? 'gainsboro' : 'white',
               },
             ]}
           >
             <Text
               style={[
                 styles.sizeText,
                 { color: size === selectedSize ? 'black' : 'gray' },
               ]}
             >
               {size}
             </Text>
           </Pressable>
         ))}
       </View>
       <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
       <Button onPress={addToCart} text="Add to cart" />
     </View>
   );
 };
 const styles = StyleSheet.create({
   container: {
     backgroundColor: 'white',
     padding: 10,
     flex: 1,
   },
   image: {
     width: '100%',
     aspectRatio: 1,
     alignSelf: 'center',
   },
   subtitle: {
     marginVertical: 10,
     fontWeight: '600',
   },
   price: {
     fontSize: 18,
     fontWeight: 'bold',
     marginTop: 'auto',
   },
 
   sizes: {
     flexDirection: 'row',
     justifyContent: 'space-around',
   },
   size: {
     width: 50,
     aspectRatio: 1,
     borderRadius: 25,
     alignItems: 'center',
     justifyContent: 'center',
   },
   sizeText: {
     fontSize: 20,
     fontWeight: '500',
     color: 'black',
   },
 });
 
 export default ProductDetailsScreen;