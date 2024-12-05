import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button, Keyboard, ActivityIndicator } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const api = axios.create({
  baseURL: "https://economia.awesomeapi.com.br/last"
});

function Dollar() {
  const [dolar, setDolar] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscar() {
    try {
      setLoading(true);
      const response = await api.get('/USD-BRL');
      console.log(response.data);
      setDolar(parseFloat(response.data.USDBRL.ask));
      Keyboard.dismiss();
    } catch (error) {
      console.log('Erro ao buscar Dólar...', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscar();
    const intervalId = setInterval(() => {
      buscar();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("./assets/dolar.png")} />
      <Text style={styles.text}>O dólar está:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.moeda}>R$ {dolar !== null ? dolar.toFixed(2) : 'Carregando...'}</Text>
      )}
      <Button style={styles.butao} title="Atualizar" onPress={buscar} />
    </View>
  );
}

function Euro() {
  const [euro, setEuro] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarEuro() {
    try {
      setLoading(true);
      const response = await api.get('/EUR-BRL');
      console.log(response.data);
      setEuro(parseFloat(response.data.EURBRL.ask));
      Keyboard.dismiss();
    } catch (error) {
      console.log('Erro ao buscar Euro...', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarEuro();
    const intervalId = setInterval(() => {
      buscarEuro();
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("./assets/euro.png")} />
      <Text style={styles.text}>O Euro está:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.moeda}>R$ {euro !== null ? euro.toFixed(2) : 'Carregando...'}</Text>
      )}
      <Button style={styles.butao} title="Atualizar" onPress={buscarEuro} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dollar" component={Dollar} />
        <Drawer.Screen name="Euro" component={Euro} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C8A2C8",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  moeda: {
    color: "#f4f4f5",
    fontSize: 35,
  },
  butao: {
    backgroundColor: "#90ee90",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    marginTop: 20,
  },
});
