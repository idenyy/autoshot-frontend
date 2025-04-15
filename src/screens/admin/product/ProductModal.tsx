import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  PanResponder,
  Pressable,
  View,
} from "react-native";

const { height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [showModal, setShowModal] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const animateTo = (toValue: number, callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => callback?.());
  };

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      slideAnim.setValue(height);
      animateTo(0);
    } else {
      animateTo(height, () => setShowModal(false));
    }
  }, [visible]);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardWillShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height),
    );
    const hide = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardHeight(0),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) slideAnim.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > SWIPE_THRESHOLD) {
          animateTo(height, () => {
            setShowModal(false);
            onClose();
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!showModal) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={showModal}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} className="flex-1 bg-black/50" />

      <Animated.View
        {...panResponder.panHandlers}
        className="absolute left-0 right-0 bg-white rounded-t-2xl pb-6 min-h-[53%]"
        style={{
          transform: [{ translateY: slideAnim }],
          bottom: keyboardHeight,
        }}
      >
        <View className="items-center pt-2 pb-1">
          <View className="w-10 h-1.5 rounded-full bg-gray-300" />
        </View>

        {children}
      </Animated.View>
    </Modal>
  );
};
