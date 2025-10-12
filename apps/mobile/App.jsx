import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DailyLogs from "./src/screens/DailyLogs";
import Landing from "./src/screens/Landing";
import Register from "./src/screens/Register";
import Settings from "./src/screens/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {console.log("app component rendered")}
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="DailyLogs" component={DailyLogs} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
