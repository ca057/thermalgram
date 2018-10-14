import { h } from 'hyperapp';

type SetConfigCallback = (config: StrictConfig) => void;

type Props = {
  setConfig: SetConfigCallback;
};

type StrictConfig = {
  serverUrl: string;
  name: string;
};

const submitConfig = (onSuccess: SetConfigCallback) => (event: Event) => {
  event.preventDefault();

  const configValues: { [key: string]: string } = {};
  for (const { type, name, value } of (event.target as HTMLFormElement).form
    .elements) {
    if (type === 'submit') continue;
    if (value === null || value === undefined || value === '') return;

    configValues[name] = value;
  }

  onSuccess(configValues as StrictConfig);
};

export default ({ setConfig }: Props) => (
  <form>
    <h2>¡Hola!</h2>
    <p>Konfiguriere den Drucker für den ultimativen Drucker-Spaß:</p>
    <input autofocus="true" type="text" name="name" placeholder="Name" />
    <input type="text" name="serverUrl" placeholder="Drucker-URL" />
    <button type="submit" onclick={submitConfig(setConfig)}>
      Konfiguration festlegen
    </button>
  </form>
);
