import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '@/database.types';

type ProductListItemProps = {
    product: Tables<'products'>
}

export const ProductListItem = ({product} : ProductListItemProps) => {
  const segments = useSegments();
  // console.log(segments)
  return (
      <Link href={`/${segments[0]}/menu/${product.id}`} asChild>   
        <Pressable  style={styles.container}>
            <Image source={{ uri: product.image || ''}} style={styles.image}
            resizeMode='contain' />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
        </Pressable>
      </Link>
    )
  }

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      flex: 1,
      maxWidth: '50%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      width: '80%',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
    price: {
      fontSize: 20,
      color: Colors.light.tint,
      fontWeight: 'bold',
    },
  });
  