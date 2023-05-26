import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useColorMode, NativeBaseProvider, extendTheme } from "native-base";
import AppRoutes from "./src/routes/AppRoutes";


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
