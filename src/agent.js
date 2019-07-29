import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

export const API_ROOT = "https://lesnayagavan.ru/api";

const responseBody = res => res.body;
const responseStatus204 = res => res.statusCode === 204;
let token = null;

const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const mailRequest = {
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseStatus204)
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const User = {
  current: () => requests.get("/users/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users/register", { user: { username, email, password } }),
  updateCredetials: user => requests.put("/users/credentials", user),
  updatePassword: (currentPassword, newPassword) =>
    requests.put("/users/password", { currentPassword, newPassword })
};

const Tenants = {
  getAll: () => requests.get("/tenants"),
  getAllHousesWithLastSensorValues: () => requests.get("/tenants/houses"),
  create: tenant => requests.post("/tenants", tenant),
  update: tenant => requests.patch("/tenants", tenant),
  remove: houseNumber => requests.del(`/tenants/${houseNumber}`)
};

const Mail = {
  send: formData => mailRequest.post("/mail", formData),
  sendBill: data => mailRequest.post("/mail/bill", data),
  sendLastBills: mail => mailRequest.post("/mail/lastBills", mail)
};

const limit = (count, p) => `limit=${count}&skip=${p ? p * count : 0}`;
const Article = {
  //pagination doesn't work properly, you will only see last 50 articles
  all: (type, page) =>
    requests.get(`/articles?type=${type}&${limit(50, page)}`),
  create: post => requests.post("/articles", post),
  update: (id, post) => requests.patch(`/articles/${id}`, post),
  remove: id => requests.del(`/articles/${id}`),
  one: id => requests.get(`/articles/${id}`)
};

const MessageTemplate = {
  all: () => requests.get(`/messageTemplates`),
  create: messageTemplate =>
    requests.post("/messageTemplates", messageTemplate),
  update: (id, messageTemplate) =>
    requests.patch(`/messageTemplates/${id}`, messageTemplate),
  remove: id => requests.del(`/messageTemplates/${id}`),
  one: id => requests.get(`/messageTemplates/${id}`)
};

const Content = {
  all: () => requests.get("/content?site=ozerodom.ru"),
  changeSalesText: salesText =>
    requests.put("/content/salesText", { salesText }),
  reorder: (section, from, to) =>
    requests.patch("/content/reorder", { section, from, to }),
  remove: (section, photo) =>
    requests.del(`/content?section=${section}&photo=${photo}`),
  update: formData => requests.put("/content/", formData),
  create: formData => requests.post("/content", formData)
};

const Bill = {
  remove: (tenantId, billId) =>
    requests.del(`/bills/bill/${billId}?tenantId=${tenantId}`),
  update: (billId, tenantId, bill) =>
    requests.put(`/bills/bill/${billId}?tenantId=${tenantId}`, bill),
  create: (tenantId, bill) =>
    requests.post("/bills/bill", { tenantId, ...bill }),
  getLast: () => requests.get("/bills/lastBills"),
  getLastBillDate: () => requests.get("/bills/lastBillDate"),
  removeLastBills: () => requests.del("/bills/lastBills")
};

const Sensors = {
  insertAll: sensorData => requests.post("/sensors/all", sensorData),
  setInitialValues: initialValues =>
    requests.post("/sensors/setInitialValues", initialValues)
};

const Tariffs = {
  getLast: () => requests.get("/tariffs/"),
  getAll: () => requests.get("/tariffs/all"),
  insert: (day, night) => requests.post("/tariffs", { day, night })
};

const Download = {
  bill: name => requests.get(`/download/bill/${name}`)
};

export default {
  User,
  Tenants,
  Mail,
  Article,
  Content,
  Sensors,
  Tariffs,
  Download,
  MessageTemplate,
  Bill,
  setToken: _token => {
    token = _token;
  }
};
