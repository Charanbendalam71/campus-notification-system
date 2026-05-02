export type StackType = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type PackageType = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

const LOG_API_URL = '/api/evaluation-service/logs';

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
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(LOG_API_URL, {
      method: 'POST',
      headers,
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
