import { useGetProductById } from '@/api/getProducts';
import { COLORS, PADDINGS, RADIUS, SIZE } from '@/themes';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

export default function ProductDetail () {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductById(id);

  if (isLoading) {
    return (
      <View style={styles.base}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.base}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.base}>
      <View style={styles.container}>
        
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: PADDINGS.md,
  },
  container: {
    alignItems: 'center',
    gap: PADDINGS.md,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZE.lg,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary + "20",
  },
  price: {
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: SIZE.md,
  },
  errorText: {
    color: COLORS.destructive,
  },
});
