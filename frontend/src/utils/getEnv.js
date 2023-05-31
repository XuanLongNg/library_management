export function getEnv(key) {
  const value = process.env[key];
  if (value) {
    return value;
  }
  throw new Error(`Please set ${key} in your config file`);
}
