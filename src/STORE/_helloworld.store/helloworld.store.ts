export interface JID_HelloworldState {
  helloworldsList: any[];
  helloworldSomething: any;
    error: any;
    isLoading: boolean;
  }
  
  export const INITIAL_HELLOWORLD_STATE: JID_HelloworldState = {
    helloworldsList: [],
    helloworldSomething: null,
    error: null,
    isLoading: false,
  };
  

  // NOTE: Updating helloworldSomething's nested item;
  /*
helloworldSomething:{
  arrayItems:[item1, item2, item3];
}


  */