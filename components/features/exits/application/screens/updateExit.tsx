import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export function  UpdateExitView(){
    return(
        <View>
            <Text style={styles.title}>Vista de las actualizaciones de salidas del producto</Text>

            <Link href = {"/auth/exits"}>
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