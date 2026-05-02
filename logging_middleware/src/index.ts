export type StackType = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type PackageType = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';

export const Log = async (
  stack: StackType,
  level: LogLevel,
  packageName: PackageType,
  message: string
): Promise<void> => {
  const payload = {
    stack,
    level,
    package: packageName,
    message
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Fallback if the remote logger fails
      console.warn('Logging to API failed:', await response.text());
    }
  } catch (error) {
    // If the network request fails entirely
    console.error('Failed to send log to API:', error);
  }
};
