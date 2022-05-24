import React from "react";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";

function FlashMessage(props) {
  return (
    <View style={{ flex: 1 }}>
      <View ref={"otherView1"} />
      <View ref={"otherView2"} />
      <View ref={"otherView3"} />
      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" /> {/* <--- here as last component */}
    </View>
  );
}

function FlashMessages(props) {
    const netInfo = useNetInfo();
  
    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No Internet Connection</Text>
        </View>
      );
  
    return null;
  }