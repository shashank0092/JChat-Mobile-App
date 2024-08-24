import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Typing = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value | Animated.ValueXY, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -10,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, [dot1, dot2, dot3]);

  return (
    <View className='flex flex-row items-center justify-center py-5 px-5 bg-gray-800 rounded-lg self-start ' >
      <Animated.View style={[ { transform: [{ translateY: dot1 }] }]} className="w-2.5 h-2.5 bg-white rounded-full mx-1" />
      <Animated.View style={[ { transform: [{ translateY: dot2 }] }]} className="w-2.5 h-2.5 bg-white rounded-full mx-1" />
      <Animated.View style={[{ transform: [{ translateY: dot3 }] }]} className="w-2.5 h-2.5 bg-white rounded-full mx-1" />
    </View>
  );
};



export default Typing;
