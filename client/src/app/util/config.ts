type Config = {
  serverUrl: null | string;
  name: null | string;
};

const defaultConfig: Config = {
  serverUrl: null,
  name: null,
};

export const getStoredConfig = () => {
  let config = null;
  try {
    config = JSON.parse(
      window.localStorage.getItem('thermalgram_config') || ''
    ) as Config | null | undefined;
  } catch (error) {}
  if (config === null || config === undefined) {
    return defaultConfig;
  }

  return {
    ...defaultConfig,
    ...config,
  };
};

export const setStoredConfig = (config: Config) => {
  try {
    window.localStorage.setItem('thermalgram_config', JSON.stringify(config));
  } catch (error) {}
};
