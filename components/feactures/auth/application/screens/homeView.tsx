
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useSessionState } from "../provider"; 
import CustomButton from "@/components/Button";

export function HomeView() {
	const {
		user,
		logout,
		message,
	  } = useSessionState()

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Link href={"/auth/products"}>
                    <CustomButton title="Enviar a Productos" />
                </Link>
                <Link href={"/auth/branches"}>
                    <CustomButton title="Enviar a Sucursales" />
                </Link>
                <Link href={"/auth/entry"}>
                    <CustomButton title="Enviar a Entradas de Producto" />
                </Link>
                <Link href={"/auth/exits"}>
                    <CustomButton title="Enviar a Salidas de Producto" />
                </Link>
                <Link href={"/auth/transfer"}>
                    <CustomButton title="Enviar a Transferencias" />
                </Link>
                <Link href={"/auth/freight"}>
                    <CustomButton title="Enviar a Fletes" />
                </Link>
            </View>

				<CustomButton 
				title='Cerrar Serion'
                backgroundColor="#fc2626"
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
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
