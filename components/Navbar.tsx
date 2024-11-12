import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "@/components/Button";
import { useSessionState } from "./feactures/auth/application/provider";


export function Navbar() {
    const { logout } = useSessionState();

    return (
        <View style={styles.navbar}>
            <Text style={styles.navbarTitle}>Inventario</Text>
            <CustomButton 
                title="Cerrar Sesión"
                backgroundColor="#fc2626"
                onPress={logout}
                style={{
                    width: 120,
                    marginHorizontal: 10,
                    borderRadius: 5,
                    paddingVertical: 10,
                    backgroundColor: 'red',
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#ccc',
                    borderWidth: 1,                
                    paddingHorizontal: 10,
                    marginBottom: 10,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        width: '100%',
        height: 60,
        backgroundColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    navbarTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
