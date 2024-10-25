import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export function  ExitView(){
    return(
        <View>
            <Text style={styles.title}>Vista de las salidas del producto</Text>

            <Link href = {"/auth/exits/create"}>
             <Button title="Enviar al la creacion de productos"/>
           </Link>

            <Link href = {"/auth/exits/update"}>
             <Button title="Enviar al la edicion de productos"/>
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