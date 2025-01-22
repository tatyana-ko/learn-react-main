import { ChangeEvent, useState } from "react";
import { ProductConfig, ConfigChange } from '../types/ProductConfig';

interface ProductConfiguratorProps {
  initialConfig: ProductConfig;
  onSave: (config: ProductConfig) => Promise<void>;
};

// 1. Тесты ("updates basic settings correctly") - инпут для выбора цвета? Как тогда должна проводиться валидация - определенный набор цветов?
// 2. Некорректно записываются изменения в историю при вводе данных в инпут (какждая буква)
// 3. При отмене выбора waterproof (input checked) - из истории изменений не удаляется запись
// 4. При сохранении данных - не понимаю как скинуть features и addons до первоначальных значений
// 5. Тесты ("handles batch updates correctly") - не понимаю, что нужно сделать

export function ProductConfigurator({ initialConfig, onSave }: ProductConfiguratorProps) {
  const [basics, setBasics] = useState(initialConfig.basics);
  const [features, setFeatures] = useState(initialConfig.features);
  const [addons, setAddons] = useState(initialConfig.addons);
  const [historyChanges, setHistoryChanges] = useState<ConfigChange[]>([]);
  const [errors, setErrors] = useState<{ quantity?: string }>({});

  const trackHistoryChanges = (path: string[], previousValue: unknown, newValue: unknown) => {
    const timestamp = Date.now();
    const change: ConfigChange = { timestamp, path, previousValue, newValue };

    setHistoryChanges(prevState => [change, ...prevState].slice(0, 5));
  };

  const handleBasicsChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const previousValue = basics[name as keyof typeof basics];

    setBasics(prevState => ({ ...prevState, [name]: value }))
    trackHistoryChanges(["basics", name], previousValue, value);
  };

  const handleUpdateFeaturesConfig = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newState = { ...features };
    const previousValue = features.waterproof[name as keyof typeof features.waterproof];

    switch (name) {
      case "waterproof":
        newState.waterproof.enabled = !newState.waterproof.enabled;

        if (!newState.waterproof.enabled) {
          newState.waterproof = {
            enabled: false,
            level: 'basic',
            settings: {},
          }
        };
        break;

      case "level":
        newState.waterproof.level = value as "basic" | "premium";
        break;

      case "comments":
        newState.waterproof.settings = {
          ...newState.waterproof.settings,
          comments: value,
        }
        break;

      default:
        break;
    }

    setFeatures(newState);
    trackHistoryChanges(["features", name], previousValue, value);
  };

  const handleAddonsChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newState = [...addons];
    const giftAddons = newState.find(item => item.id === "gift-wrap");
    let previousValue: string | number | undefined = "";

    if (giftAddons) {
      switch (name) {
        case "quantity":
          {
            previousValue = giftAddons[name];
            giftAddons.quantity = Number(value);
          }
          break;

        case "customization-color":
          {
            previousValue = giftAddons.customization.color;
            giftAddons.customization.color = value;
          }
          break;

        case "customization-text":
          {
            previousValue = giftAddons.customization.text;
            giftAddons.customization.text = value;
          }
          break;

        default:
          break;
      }

      setAddons(newState);
      trackHistoryChanges(["addons", name], previousValue, value);
    }
  };

  const undoConfigurationSettings = () => {
    if (!historyChanges[0]) {
      return;
    };

    const { path, previousValue } = historyChanges[0];

    switch (path[0]) {
      case "basics":
        setBasics(prevState => ({ ...prevState, [path[1]]: previousValue }));
        break;

      case "features":
        setFeatures(prevState => {
          const updatedFeatures = { ...prevState };
          const updatedWaterproof = updatedFeatures.waterproof;

          if (updatedWaterproof) {
            switch (path[1]) {
              case "waterproof":
                if (!previousValue) {
                  updatedWaterproof.enabled = false;
                } else if (previousValue === "on") {
                  updatedWaterproof.enabled = true;
                }
                break;

              case "level":
                updatedWaterproof.level = previousValue as "basic" | "premium";
                break;

              case "comments":
                //undefined  + (неправильно отображается state) ?
                updatedWaterproof.settings = {
                  ...updatedWaterproof.settings,
                  comments: previousValue
                };
                break;

              default:
                break;
            }
          }

          return updatedFeatures;
        });
        break;

      case "addons":
        setAddons(prevState => {
          const updatedAddons = [...prevState];
          const giftAddons = updatedAddons.find(item => item.id === "gift-wrap");

          if (giftAddons) {
            switch (path[1]) {
              case "quantity":
                giftAddons.quantity = previousValue as number;
                break;

              case "customization-color":
                giftAddons.customization.color = previousValue as string;
                break;

              case "customization-text":
                //undefined в первом рендере + (неправильно отображается state) ?
                giftAddons.customization.text = previousValue as string;
                break;

              default:
                break;
            }
          };

          return updatedAddons;
        })
        break;

      default:
        break;
    }

    setHistoryChanges(prevState => prevState.slice(1));
  };

  const saveConfigurations: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const giftWrapAddons = addons.find(item => item.id === "gift-wrap");

    if (!giftWrapAddons) {
      return;
    };

    if (giftWrapAddons.quantity <= 0 || giftWrapAddons.quantity > 5) {
      setErrors({ ...errors, quantity: "invalid quantity" });
    } else {
      onSave({ basics, features, addons });
      setBasics(initialConfig.basics);
      // setFeatures({);
      // setAddons();
      setHistoryChanges([]);
      setErrors({});
    };
  };

  const preview = (property: string | number) => {
    const giftWrapAddons = addons.find(item => item.id === "gift-wrap");

    if (!giftWrapAddons) {
      return;
    }

    if (property === "color" || property === "text") {
      return giftWrapAddons?.customization[property];
    };

    return giftWrapAddons[property as keyof typeof giftWrapAddons];
  };

  return (
    <div className="product-configurator">
      <h1>Product Configurator: </h1>
      <form className="form-group" onSubmit={saveConfigurations}>
        <div className="config-section">
          <h3>Basic Settings</h3>
          <label> Color:
            <input name="color" type="text" value={basics.color} onChange={(e) => handleBasicsChange(e)} />
          </label>
          <br />
          <label> Size:
            <select name="size" value={basics.size} onChange={(e) => handleBasicsChange(e)}>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </label>
          <br />
          <label> Material:
            <select name="material" value={basics.material} onChange={(e) => handleBasicsChange(e)}>
              <option value="satin">satin</option>
              <option value="cotton">cotton</option>
              <option value="velour">velour</option>
            </select>
          </label>
        </div>

        <div className="config-section">
          <h3>Features</h3>
          <div>
            <label>Waterproof
              <input type="checkbox" name="waterproof" role="switch" checked={features.waterproof.enabled} onChange={e => handleUpdateFeaturesConfig(e)} />
            </label>
          </div>

          {features.waterproof.enabled && <div>
            <label htmlFor="level">Level: </label>
            <select name="level" id="level" onChange={e => handleUpdateFeaturesConfig(e)} >
              <option value="basic">basic</option>
              <option value="premium">premium</option>
            </select>

            <p>Additional settings: </p>
            <label>Add comments:
              <input type="text" name="comments" onChange={e => handleUpdateFeaturesConfig(e)} />
            </label>
          </div>}
        </div>

        <div className="config-section">
          <h3>Add-ons</h3>
          <ul>
            {addons?.map(item => (<li key={item.id} className="addon-item">
              <p>{item.id}</p>
              <label>{item.id} quantity (max - 5):
                <input name="quantity" type="number" value={item.quantity} onChange={e => handleAddonsChange(e)} />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
              </label>
              <p className="addon-customization">Customization:

                <select name="customization-color" value={item.customization.color} onChange={e => handleAddonsChange(e)}>
                  <option value="black">black</option>
                  <option value="white">white</option>
                  <option value="green">green</option>
                </select>

                <input type="text" name="customization-text" placeholder="Add text" onChange={e => handleAddonsChange(e)} />
              </p>
            </li>))}
          </ul>
        </div>

        <div className="config-preview">
          <h3>Preview</h3>
          <h4>Basic settings: </h4>
          <p>Color: {basics.color}</p>
          <p>Size: {basics.size}</p>
          <p>Material: {basics.material}</p>
          <h4>Selected features: </h4>
          <p>Waterproof level: {features.waterproof.level}</p>
          <h4>Add-ons: </h4>
          <p>Gift-wrap quantity: {String(preview("quantity"))} </p>
          <p>Gift-wrap color: {String(preview("color"))} </p>
          <p>Gift-wrap text: {preview("text") ? String(preview("text")) : ""} </p>
        </div>

        <div className="config-history">
          <h3>History</h3>
          <ul>
            {historyChanges.map(change => (
              <li key={change.timestamp}>changed {change.path[1]} to {String(change.newValue)}</li>
            ))}
          </ul>
          <button type="button" name="undo" onClick={undoConfigurationSettings}>Undo last change</button>
        </div>

        <div className="config-actions">
          <button type="submit" name="save">Save Configuration</button>
          {/* <button type="button">Apply preset</button> */}
        </div>
      </form>
    </div>
  );
};


