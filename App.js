import { NotesProvider } from "./src/data/store/AppContext";
import  AppNavigator  from "./src/navigation/AppNavigation";
export default function App() {
  return (
    <NotesProvider>
      <AppNavigator />
    </NotesProvider>
  );
}
