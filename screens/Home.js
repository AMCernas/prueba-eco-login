import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";

export default function HomeScreen({ route }) {
  const { token } = route.params;
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ecoapi.gocsa.com.mx/EcoTienda/ClienteDatos",
          { cveCliente: 20 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <View style={styles.container}>
      {clientData && (
        <>
        <View style={styles.clientContainer}>
          <Text style={styles.title}>Cliente: {clientData.nombreCliente}</Text>
          <Text style={styles.title}>Dirección: {clientData.domicilio}</Text>
        </View>

          <View style={styles.listContainer}>
          <FlatList
          data={clientData.clientesprogramados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemContainerImage}>
                <Image
                  style={styles.visitaImageExample}
                  source={require('../assets/camera.png')}
                />
              </View>
              <View style={styles.itemContainerText}>
                <Text style={styles.visitaText}> Tipo de Visita: {item.tipoVisita}</Text>
                <Text style={styles.visitaText}>Días: {item.diasVisita}</Text>
              </View>
            </View>
          )}
        />
        </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  clientContainer: {
    backgroundColor: "#4bd1be", 
    padding: 26
  },
  container: { 
    flex: 1, 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 16, 
    color: "white" 
  },
  listContainer: {
    flex: 1, 
    backgroundColor: 'lightgrey', 
    paddingVertical: 16, 
    borderRadius: 8, 
  },
  itemContainer: {
    flexDirection: "row", 
    padding: 26, 
    borderBottomWidth: 1, 
    borderBottomColor: 'white', 
    paddingBottom: 16, 
    marginBottom: 16, 
    backgroundColor: "#ffffff", 
    elevation: 2,
  },
  itemContainerImage: {
    backgroundColor:"#4bd1be", 
    padding:8, 
    borderRadius: 8, 
    marginRight: 8
  },
  itemContainerText:{
    marginTop: 8
  },
  visitaText: {
    fontSize:16, 
    color: "#4bd1be"
  },
  visitaImageExample: {
    width:40, 
    height:40,
  }
});
