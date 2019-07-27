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
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
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
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
    }
  }
  if (deleted) {
    try {
      const payload = await agent.Tenants.remove(deleted[0]);
      return dispatch({ type: TENANT_DELETED, payload, _id: deleted[0] });
    } catch (e) {
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
    }
  }
};

export const commitBillChanges = (
  { added, changed, deleted },
  tenantId
) => async dispatch => {
  if (added) {
    try {
      const payload = await agent.Bill.create(tenantId, added[0]);
      if (payload.error) {
        dispatch(openSnack("error", payload.error.msg));
        return;
      }
      dispatch(openSnack("success", "Счет создан"));
      return dispatch({ type: BILL_ADDED, payload, tenantId });
    } catch (e) {
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
    }
  }
  if (changed) {
    try {
      const [_id] = Object.keys(changed);
      const rest = changed[_id];
      const payload = await agent.Bill.update(_id, tenantId, {
        ...rest
      });
      if (payload.error) {
        dispatch(openSnack("error", payload.error.msg));
        return;
      }
      dispatch(openSnack("success", "Документ обновлен"));
      return dispatch({ type: BILL_UPDATED, payload, _id });
    } catch (e) {
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
    }
  }
  if (deleted) {
    try {
      const billId = deleted[0];
      const payload = await agent.Bill.remove(tenantId, billId);
      if (payload) {
        return dispatch(openSnack("error", payload.error.msg));
      }
      return dispatch({ type: BILL_DELETED, tenantId, billId });
    } catch (e) {
      return dispatch(openSnack("error", "Возникла ошибка, повторите позже"));
    }
  }
};
