export const editTableColumns = [
  { name: "houseNumber", title: "№Дома" },
  { name: "name", title: "ФИО" },
  { name: "email", title: "Email" }
];
export const mailTableColumns = [
  { name: "houseNumber", title: "№Дома" },
  { name: "name", title: "ФИО" }
];
export const editTableColumnExtensions = [
  {
    columnName: "houseNumber",
    width: 100,
    align: "center"
  },
  { columnName: "name", width: 250 },
  { columnName: "email", width: 250 }
];
export const mailTableColumnExtensions = [
  {
    columnName: "houseNumber",
    width: 100,
    align: "center"
  },
  { columnName: "name", width: 250 }
];

export const editRowId = row => row._id;
export const mailRowId = row => row.houseNumber;
