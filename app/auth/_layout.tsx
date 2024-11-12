import { Stack, Tabs } from "expo-router";

  export default function AuthLayout(){
    return(
       <Stack>
        <Tabs.Screen
            name ="Login"
            options={{
                title:"",
                headerShown: false 
            }}
          />
        
        <Tabs.Screen
            name ="Home"
            options={{
                title:"",
                headerShown: false
            }}
          
            />
       </Stack> 
    )
  }