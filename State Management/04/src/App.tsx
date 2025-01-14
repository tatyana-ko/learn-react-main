import './App.css';
import { NotificationPreferences } from './components/NotificationPreferences';

const handleSubmit = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Submitted form notification:', data);
};

function App() {
  return (
    <>
      <NotificationPreferences onSubmit={handleSubmit} />
    </>
  )
}

export default App
