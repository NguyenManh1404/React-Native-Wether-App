import React from "react";
import { StatusBar, Text,View,SafeAreaView } from "react-native";
import HomeScreen from "./src/screens/home";



export default function App() {
  StatusBar.setBackgroundColor('#242334') // set màu background cho status
  StatusBar.setBarStyle('light-content') // set màu cho icon trong status
  return(
    <SafeAreaView style={{flex:1}} >
      <HomeScreen/>
    </SafeAreaView>
  )
}