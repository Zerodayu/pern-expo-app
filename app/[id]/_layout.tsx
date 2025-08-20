import { Stack, useRouter } from 'expo-router'
import React from 'react'

const _layout = () => {
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom"
      }}
    />
  )
}


export default _layout