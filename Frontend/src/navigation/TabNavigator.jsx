import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import LeadsScreen from "../screens/Leads/LeadsScreen";
import ProjectsScreen from "../screens/Projects/ProjectsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Leads" component={LeadsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
    </Tab.Navigator>
  );
}
