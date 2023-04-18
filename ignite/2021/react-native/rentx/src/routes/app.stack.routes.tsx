import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CarDetails from "../screens/CarDetails";
import Home from "../screens/Home";
import MyCars from "../screens/MyCars";
import Scheduling from "../screens/Scheduling";
import Confirmation from "../screens/Confirmation";
import SchedulingDetails from "../screens/SchedulingDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
