import { ProductConfigurator } from "./components/ProductConfigurator";
import { ProductConfig } from "./types/ProductConfig";
import './App.css';

const initial: ProductConfig = {
  basics: {
    color: 'red',
    size: 'medium',
    material: 'cotton',
  },
  features: {
    waterproof: {
      enabled: false,
      level: 'basic',
      settings: {},
    },
  },
  addons: [
    {
      id: 'gift-wrap',
      quantity: 1,
      customization: {
        color: 'white',
      },
    },
  ],
};

const handleSave = async (config: ProductConfig) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(config);
};

function App() {
  return (
    <ProductConfigurator initialConfig={initial} onSave={handleSave} />
  )
}

export default App;
