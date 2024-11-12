// CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useWindowDimensions, GestureResponderEvent, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CustomButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  navigateTo?: string; 
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  navigateTo,
  color = '#FFFFFF',
  backgroundColor = '#48b2ff',
  style,
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const handlePress = (event: GestureResponderEvent) => {
    if (navigateTo) {
      navigation.navigate(navigateTo); 
    } else if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor, width: width * 0.8 },
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
