import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/hooks/AuthContext";
import DailyLogs from "./src/screens/DailyLogs";
import Landing from "./src/screens/Landing";
import Register from "./src/screens/Register";
import Settings from "./src/screens/settings";
import DeleteAccount from "./src/screens/settings/DeleteAccount"
import Reports from "./src/screens/Report";
import MedsInfo from "./src/screens/MedsInfo";
import Checklist from "./src/screens/Checklist";
import Login from "./src/screens/Login";
import Dashboard from "./src/screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
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
          <Stack.Screen name="Report" component={Reports} />
          <Stack.Screen name="Medication Information" component={MedsInfo} />
          <Stack.Screen name="Checklist" component={Checklist} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Delete Account" component={DeleteAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
