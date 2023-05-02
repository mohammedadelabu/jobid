export const roleModulePermission = (
  moduleName: string,
  permittedModuleList: any
) => {
  let isModuleExist = false;
  if (permittedModuleList) {
    permittedModuleList?.find((p: any) => console.log('p: ', p));
    let moduleExist = permittedModuleList?.findIndex((pI: any) => {
      return pI?.RoleModule?.ModuleName == moduleName;
    });
    if (permittedModuleList[moduleExist]) {
      isModuleExist = true;
    }
  }
  return isModuleExist;
};
