import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";


export function  UpdateFreightView(){
    return(
        <View>
            <Text style={styles.title}>Vista de las actualizaciones los Fletes</Text>

            <Link href = {"/auth/freight"}>
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