import { Toaster } from './components/ui/sonner';
import AppProvider from './providers';
import AppRouter from './routes';
export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster
        position="bottom-center"
        richColors={true}
        toastOptions={
          {
            //   classNames: {
            //     // error: 'bg-red-200',
            //     // success: 'text-green-400',
            //     // warning: 'text-yellow-400',
            //     // info: 'bg-blue-400',
            //   },
          }
        }
      />
    </AppProvider>
  );
}
