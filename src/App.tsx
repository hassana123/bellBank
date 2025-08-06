import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import theme from "./config/theme";
import router from "./router";
import GlobalContextProvider from "./store/contexts/provider";

function AppContent() {
  const { theme: currentTheme } = useTheme(); // ← this is now inside the provider
  return (
    <ConfigProvider theme={theme({ themeValue: currentTheme })}>
      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
