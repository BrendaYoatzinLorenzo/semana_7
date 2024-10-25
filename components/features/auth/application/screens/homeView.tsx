import Button from "@/components/Button";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useSessionState } from "../../provider";

export function HomeView() {
	const {
		user,
		logout,
		message,
	  } = useSessionState()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vista cuando hay un Login Activo</Text>
            <View style={styles.buttonContainer}>
                <Link href={"/auth/products"}>
                    <Button title="Enviar a Productos" style={styles.button} />
                </Link>
                <Link href={"/auth/branches"}>
                    <Button title="Enviar a Sucursales" style={styles.button} />
                </Link>
                <Link href={"/auth/entry"}>
                    <Button title="Enviar a Entradas de Producto" style={styles.button} />
                </Link>
                <Link href={"/auth/exits"}>
                    <Button title="Enviar a Salidas de Producto" style={styles.button} />
                </Link>
                <Link href={"/auth/transfer"}>
                    <Button title="Enviar a Transferencias" style={styles.button} />
                </Link>
                <Link href={"/auth/freight"}>
                    <Button title="Enviar a Fletes" style={styles.button} />
                </Link>
            </View>

						<Button 
				title='Cerrar Serion'
				onPress={logout}
				/>
				
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        marginVertical: 10,
    },
});
