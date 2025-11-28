import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import API from "../../services/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });
      loginUser(res.data.token, res.data.user);
    } catch (err) {
      console.log("Signup Error:", err);
      const message = err.response?.data?.message || err.message || "Signup failed. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.logo}>ClientTracker</Text>
          <Text style={styles.subtitle}>Start managing your clients professionally</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create Account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#A0A8D4"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#A0A8D4"
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a strong password"
              placeholderTextColor="#A0A8D4"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          By signing up, you agree to our Terms & Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7B89D8",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#E8EBFF",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E86",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5E6CA8",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F7FF",
    borderWidth: 1.5,
    borderColor: "#D4DCFC",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: "#2C3E86",
  },
  button: {
    backgroundColor: "#5E6CA8",
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: "#5E6CA8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D4DCFC",
  },
  dividerText: {
    color: "#A0A8D4",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  linkButton: {
    paddingVertical: 12,
  },
  linkText: {
    color: "#7B89D8",
    textAlign: "center",
    fontSize: 15,
  },
  linkBold: {
    color: "#5E6CA8",
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    color: "#E8EBFF",
    fontSize: 12,
    marginTop: 24,
    lineHeight: 18,
  },
});