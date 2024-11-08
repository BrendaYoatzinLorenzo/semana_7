import { Stack, Tabs } from "expo-router";

  export default function AuthLayout(){
    return(
       <Stack>
        <Tabs.Screen
            name ="Login"
            options={{
                title:"Login",
                headerShown: false 
            }}
          />
        
        <Tabs.Screen
            name ="Home"
            options={{
                title:"Home",
                headerShown: false
            }}
          
            />
       </Stack> 
    )
  }