import { useCreateProduct } from '@/api/postProduct';
import { COLORS, PADDINGS, RADIUS, SIZE } from '@/themes';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Add() {
  const [projectName, setProjectName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  
  const createProductMutation = useCreateProduct();

  const handleAddProject = async () => {
    // Validation
    if (!projectName.trim()) {
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

    const projectData = {
      name: projectName.trim(),
      price: parseFloat(price),
      image: url.trim(),
    };

    try {
      await createProductMutation.mutateAsync(projectData);
      Alert.alert('Success', 'Product added successfully!');
      
      // Clear form
      setProjectName('');
      setPrice('');
      setUrl('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add product. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.base} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add New Project</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Enter project name"
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
          style={[styles.button, createProductMutation.isPending && styles.buttonDisabled]} 
          onPress={handleAddProject}
          disabled={createProductMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {createProductMutation.isPending ? 'Adding...' : 'Add Project'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.foreground,
  },
});
