import {
  TENANT_ADDED,
  TENANT_UPDATED,
  TENANT_DELETED,
  BILL_ADDED,
  BILL_UPDATED,
  BILL_DELETED
} from "../../constants/actionTypes";
import agent from "../../agent";
import { openSnack } from "../../actions";
export const commitChanges = ({
  added,
  changed,
  deleted
}) => async dispatch => {
  if (added) {
    try {
      const payload = await agent.Tenants.create(added[0]);
      return dispatch({ type: TENANT_ADDED, payload });
    } catch (e) {
      if (e.response.body.errors)
        return dispatch(openSnack("error", e.response.body.errors[0].msg));
    }
  }
  if (changed) {
    try {
      const [_id] = Object.keys(changed);
      const rest = changed[_id];
      const payload = await agent.Tenants.update({
        _id,
        ...rest
      });
      return dispatch({ type: TENANT_UPDATED, payload, _id });
    } catch (e) {
      if (e.response.body.errors) {
        return dispatch(openSnack("error", e.response.body.errors[0].msg));
      }
    }
  }
  if (deleted) {
    const payload = await agent.Tenants.remove(deleted[0]);
    return dispatch({ type: TENANT_DELETED, payload, _id: deleted[0] });
  }
};

export const commitBillChanges = (
  { added, changed, deleted },
  tenantId
) => async dispatch => {
  if (added) {
    try {
      const payload = await agent.Bill.create(tenantId, added[0]);
      return dispatch({ type: BILL_ADDED, payload, tenantId });
    } catch (e) {
      if (e.response.body.errors)
        return dispatch(openSnack("error", e.response.body.errors[0].msg));
    }
  }
  if (changed) {
    try {
      const [_id] = Object.keys(changed);
      const rest = changed[_id];
      const payload = await agent.Bill.update({
        _id,
        ...rest
      });
      return dispatch({ type: BILL_UPDATED, payload, _id });
    } catch (e) {
      if (e.response.body.errors) {
        return dispatch(openSnack("error", e.response.body.errors[0].msg));
      }
    }
  }
  if (deleted) {
    console.log(deleted[0]);
    const billId = deleted[0];
    await agent.Bill.remove(tenantId, billId);
    return dispatch({ type: BILL_DELETED, tenantId, billId });
  }
};
