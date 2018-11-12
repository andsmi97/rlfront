export const createTenantsStringArray = tenants => {
  return Object.entries(tenants).map(
    tenant => `${tenant[0]} ${tenant[1].name}`
  );
};

export const getTenantsObjectsFromSelected = (selectedArray, tenants) => {
  return Object.keys(tenants)
    .filter(homeNumber => {
      return selectedArray
        .map(tenant => {
          return tenant
            .trim()
            .split(" ")
            .shift();
        })
        .includes(homeNumber);
    })
    .reduce((acc, homeNumber) => {
      acc[homeNumber] = tenants[homeNumber];
      return acc;
    }, {});
};
