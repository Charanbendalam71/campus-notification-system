export type StackType = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type PackageType = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';
export declare const Log: (stack: StackType, level: LogLevel, packageName: PackageType, message: string) => Promise<void>;
