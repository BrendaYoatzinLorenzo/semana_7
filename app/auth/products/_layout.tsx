import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: 'Login',
  };

export default function _layout(){
	return(
		<Stack screenOptions={{ headerShown:false }}>
			<Stack.Screen name="Login" options={{
				title: "",	
				presentation: 'modal',

			}}/>
			<Stack.Screen name="Home" options={{
                title: "",
                headerShown: false,
                
            }}/>
		</Stack>
	)
}