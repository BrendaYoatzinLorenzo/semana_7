import { Stack } from "expo-router";

export default function _layout(){
	return(
		<Stack>
			<Stack.Screen name="index" options={{
				title: "Home"
			}}/>
			<Stack.Screen name="create" options={{
                title: "Creacion"
            }}/>
			<Stack.Screen name="update" options={{
                title: "Actualizacion"
            }}/>
		</Stack>
	)
}