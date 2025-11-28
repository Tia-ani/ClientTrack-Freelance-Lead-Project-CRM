import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AccountMenu from "../components/AccountMenu";
import DashboardScreen from "../screens/DashboardScreen";
import LeadsScreen from "../screens/Leads/LeadsScreen";
import ProjectsScreen from "../screens/Projects/ProjectsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <AccountMenu
            name={user?.name}
            email={user?.email}
            avatarUrl={user?.avatarUrl}
            onProfilePress={() => console.log("Navigate to profile")}
            onSignOut={logoutUser}
          />
        ),
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Leads" component={LeadsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
    </Tab.Navigator>
  );
}
