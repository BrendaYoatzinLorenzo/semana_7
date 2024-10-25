import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export function  CreateEntryView(){
    return(
        <View>
            <Text style={styles.title}>Vista del la creacion de entradas de producto</Text>

            <Link href = {"/auth/entry"}>
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