import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import AccountMenu from "../components/AccountMenu";

import DashboardScreen from "../screens/DashboardScreen.jsx";
import LeadsScreen from "../screens/Leads/LeadsScreen.jsx";
import ProjectsScreen from "../screens/Projects/ProjectsScreen.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <AccountMenu
            name={user?.name}
            email={user?.email}
            avatarUrl={user?.avatarUrl}
            onProfilePress={() => navigation.navigate("Profile")}
            onSignOut={logoutUser}
          />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Leads" component={LeadsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
