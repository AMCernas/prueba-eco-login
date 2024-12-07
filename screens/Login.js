import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Pressable } from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://ecoapi.gocsa.com.mx/EcoTienda/LoginECO", {
        correo,
        pwd,
      });
      if (response.data.cveRespuesta === 1) {
        navigation.navigate("Home", { token: response.data.token });
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.userLogo}
        source={require('../assets/user3.png')}
      />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={correo}
        onChangeText={setCorreo}
        textColor="white"
        placeholderTextColor={"white"}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry
        textColor="white"
        placeholderTextColor={"white"}
      />
      <View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Ingresar</Text>
      </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 16, 
    backgroundColor: "#4bd1be" 
  },
  userLogo: {
    width: 100, 
    height: 100, 
    alignSelf: "center", 
    marginBottom: 5
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 75, 
    color: "white", 
    textAlign: "center" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#6ae6d0", 
    padding: 8, 
    marginBottom: 16, 
    backgroundColor: "#17ae90", 
    borderRadius: 16, 
    color: "white", 
    textAlign: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor:"#6ae6d0"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
