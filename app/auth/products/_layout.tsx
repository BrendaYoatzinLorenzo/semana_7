import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: 'index',
  };

export default function _layout(){
	return(
		<Stack>
			<Stack.Screen name="index" options={{
				title: "Inicio",		
				presentation: 'modal',

			}}/>
		</Stack>
	)
}