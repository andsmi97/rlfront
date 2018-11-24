export const createTenantsStringArray = tenants => {
  return tenants.map(tenant => `${tenant.houseNumber} ${tenant.name}`);
};

export const getTenantsObjectsFromSelected = (selectedArray, tenants) => {
  return tenants.filter(tenant => {
    return selectedArray
      .map(tenant => {
        return Number(
          tenant
            .trim()
            .split(" ")
            .shift()
        );
      })
      .includes(tenant.houseNumber);
  });
};
