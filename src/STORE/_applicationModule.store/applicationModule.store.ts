export interface JID_ApplicationModuleState {
  applicationModules: any[];
  error: any;
  lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_APPLICATION_MODULE_STATE: JID_ApplicationModuleState =
  {
    applicationModules: [],
    error: null,
    lastUpdate: new Date(),
    isLoading: false,
  };
