import Button from "@/components/Button";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export function CreateTransferView(){
    return(
        <View>
           <Text style={styles.title}>Aqui se creara un nuevo Transferencia...</Text> 

           <Link href = {"/auth/transfer"}>
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