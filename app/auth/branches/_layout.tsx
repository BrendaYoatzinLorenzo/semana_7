import { Stack } from "expo-router";

export default function _layout(){
	return (
		<Stack>
			<Stack.Screen name="index" options={{
				title: "Inicio",
				presentation: 'modal'
			}}/>
            <Stack.Screen name="create" options={{
				title: "Creacion",
				presentation: 'modal'
			}}/>
			<Stack.Screen name="detail" options={{
				title: "Actualizar",
				presentation: 'modal'
			}} />
		</Stack>
	)
}