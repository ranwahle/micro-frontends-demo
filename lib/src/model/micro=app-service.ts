/**
 * This interface models data service published by the micro app
 */
export interface  MicroAppService {
    serviceName: string;
    appName: string;
    invokeMethod: (...args: any[])=> Promise<any>
}