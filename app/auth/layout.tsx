import { Stack } from "expo-router";

  export default function AuthLayout(){
    return(
       <Stack>
        <Stack.Screen
            name ="login"
            options={{
                title:"Ingresar",
            }}
        >
        </Stack.Screen>
        <Stack.Screen
            name ="home"
            options={{
                title:"Home",
            }}
          
            />
       </Stack> 
    )
  }