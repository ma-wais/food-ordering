import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import products from '@assets/data/products';
import {ProductListItem} from '@/components/ProductListItem';
import { useProductList } from '@/api/products';


export default function TabOneScreen() {
  const { data : products, error, isLoading } = useProductList()
  if (isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>{error.message}</Text>
  }

  return (
      <FlatList data={products} renderItem={({item}) => 
        <ProductListItem product={item} />} 
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{gap:10}}
      />
  );
}
