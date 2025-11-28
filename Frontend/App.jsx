import AppNavigator from "./src/navigation/AppNavigator.jsx";
import AuthProvider from "./src/context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
