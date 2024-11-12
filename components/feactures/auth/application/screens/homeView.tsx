import React from "react";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native"; 
import CustomButton from "@/components/Button";
import { Navbar } from "@/components/Navbar";

export function HomeView() {


    return (
        <View style={styles.container}>
            <Navbar />
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});