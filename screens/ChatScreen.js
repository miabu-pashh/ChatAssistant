import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Hardcoded responses
  const responses = {
    hello: "Hello! How can I help you today?",
    "how are you": "I'm a bot, but thanks for asking!",
    "what is react native":
      "React Native is a framework for building native apps using React.",
    bye: "Goodbye! Have a great day!",
  };

  // Function to handle sending a message
  const handleSend = () => {
    if (input.trim()) {
      // Add user message to the list
      const userMessage = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Find bot response or default to a generic response
      const botResponseText =
        responses[input.toLowerCase()] ||
        "I'm not sure about that. Please ask something else.";

      // Add bot message with a slight delay
      setTimeout(() => {
        const botMessage = { sender: "bot", text: botResponseText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 500); // 500 ms delay to simulate response time

      // Clear input field
      setInput("");
    }
  };

  // Render a single message
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003049",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#003049",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: "80%",
    // backgroundColor: "#8ecae6",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#669bbc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    color: "white",
    backgroundColor: "#003049",
  },
  sendButton: {
    backgroundColor: "#003049",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});
