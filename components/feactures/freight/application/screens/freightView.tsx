import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export function  FreightView(){
    return(
        <View>
            <Text style={styles.title}>Vista de las salidas del producto</Text>

            <Link href = {"/auth/freight/create"}>
             <Button title="Enviar al la creacion de Fletes"/>
           </Link>

            <Link href = {"/auth/freight/update"}>
             <Button title="Enviar al la edicion de Fletes"/>
           </Link>

           <Link href = {"/auth/login"}>
             <Button title="Regresar"/>
           </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center'
    }
});