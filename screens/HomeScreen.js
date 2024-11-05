import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
export default function HomeScreen({ navigation }) {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Interpolate spin value to create rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Stand.png")} style={styles.image} />
      <TouchableOpacity
        // onPress={() => console.log("clicked")}
        onPress={() => navigation.navigate("Chat")}
        style={styles.button}
      >
        <Animated.Text
          style={[styles.skeletonSpin, { transform: [{ rotate: spin }] }]}
        >
          💀
        </Animated.Text>
        <Text style={styles.buttonText}>Start..</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('../assets/Termi.png')",
  },
  image: {
    width: 200,
    height: 400,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  skeletonSpin: {
    fontSize: 24,
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
