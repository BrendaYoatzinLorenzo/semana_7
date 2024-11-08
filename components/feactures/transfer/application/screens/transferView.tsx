import Button from "@/components/Button";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export function TransferView(){
    return(
        <View>
           <Text style={styles.title}>Vista de la Transferencias...</Text> 

           <Link href = {"/auth/transfer/create"}>
             <Button title="Enviar a la creacion de transferencias de Productos"/>
           </Link>

            <Link href = {"/auth/transfer/update"}>
             <Button title="Enviar a la edicion de transferencias de Productos"/>
           </Link>

           <Link href = {"/auth/login"}>
             <Button title="Regresar"/>
           </Link>

        </View>
    );
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

