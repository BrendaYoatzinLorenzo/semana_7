import { Stack } from "expo-router";

export default function _layout(){
	return(
		<Stack>
			<Stack.Screen name="index" options={{
				title: "Inicio"
			}}/>
			<Stack.Screen name="create" options={{
                title: "Creación",
				presentation: "containedModal",
            }}/>
			<Stack.Screen name="update" options={{
                title: "Actualizar",
				presentation: "containedModal",
            }}/>
		</Stack>
	)
}