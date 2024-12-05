import React from "react";
import { Text, View, Button, Image, StyleSheet} from "react-native";

export default function Dollar(){
    return (
        <View style={styles.container}>
            <Image style={styles.img} src={require("../../../assets/dolar.png")}/>
            <Text style={styles.text}>O dolar está:</Text>
            <Text style={styles.moeda}>R$ 6.31</Text>
            <Button style={styles.butao} title="Atualizar" onPress={() => alert("Atualizando dados...")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    img:{
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    text:{
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    moeda:{
        color: "#f4f4f5",
        fontSize: 35,
    },
    butao:{
        backgroundColor: "#90ee90",
        padding: 10,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20,
    }
})