import { useGetProductById } from '@/api/getProducts';
import { useUpdateProduct } from '@/api/putProduct';
import { COLORS, PADDINGS, RADIUS, SIZE } from '@/themes';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProductDetail () {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductById(id);
  const updateProductMutation = useUpdateProduct();
  
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price.toString());
      setUrl(product.image);
    }
  }, [product]);

  const handleUpdateProduct = async () => {
    // Validation
    if (!productName.trim()) {
      Alert.alert('Error', 'Please enter a product name');
      return;
    }
    if (!price.trim()) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a URL');
      return;
    }

    const productData = {
      name: productName.trim(),
      price: parseFloat(price),
      image: url.trim(),
    };

    try {
      await updateProductMutation.mutateAsync({ id, productData });
      Alert.alert('Success', 'Product updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update product. Please try again.');
    }
  };

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
    <KeyboardAwareScrollView
      style={styles.base}
      contentContainerStyle={{flexGrow: 1}}
      enableAutomaticScroll={true}
      enableOnAndroid={true}
      extraScrollHeight={120}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Product Details</Text>
        
        <Image 
          source={{ uri: url || product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
            placeholderTextColor={COLORS.secondary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            placeholderTextColor={COLORS.secondary}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            placeholder="Enter image URL"
            placeholderTextColor={COLORS.secondary}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, updateProductMutation.isPending && styles.buttonDisabled]} 
          onPress={handleUpdateProduct}
          disabled={updateProductMutation.isPending}
        >
          {updateProductMutation.isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Update Product</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: PADDINGS.md,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: PADDINGS.xl,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary + "20",
    alignSelf: 'center',
    marginBottom: PADDINGS.md,
  },
  formGroup: {
    marginBottom: PADDINGS.md,
  },
  label: {
    fontSize: SIZE.sm,
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: PADDINGS.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: RADIUS.sm,
    padding: PADDINGS.sm,
    fontSize: SIZE.sm,
    color: COLORS.foreground,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: PADDINGS.md,
    paddingHorizontal: PADDINGS.lg,
    borderRadius: RADIUS.full,
    marginTop: PADDINGS.xl,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZE.sm,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  errorText: {
    color: COLORS.destructive,
  },
});
