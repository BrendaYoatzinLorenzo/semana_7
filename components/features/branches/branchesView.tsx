import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export function  BranchesView(){
    return(
        <View>
            <Text style={styles.title}>Vista de las de las Sucursales</Text>

            <Link href = {"/auth/branches/create"}>
             <Button title="Enviar al la creacion de productos"/>
           </Link>

            <Link href = {"/auth/branches/update"}>
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