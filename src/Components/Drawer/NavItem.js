import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import MoneyIcon from "@material-ui/icons/MonetizationOn";
import ContactIcon from "@material-ui/icons/ContactMail";
import PeopleIcon from "@material-ui/icons/People";
import NewsIcon from "@material-ui/icons/FormatAlignLeft";
import ImageIcon from "@material-ui/icons/Image";
import ProjectIcon from "@material-ui/icons/Home";
import ExitIcon from "@material-ui/icons/ExitToApp";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SensorIcon from "@material-ui/icons/OfflineBolt";
import { connect } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const icon = {
  Рассылка: <EmailIcon />,
  Новости: <NewsIcon />,
  Проекты: <ProjectIcon />,
  Жильцы: <PeopleIcon />,
  Тарифы: <MoneyIcon />,
  Содержимое: <ImageIcon />,
  Счета: <CreditCardIcon />,
  Показания: <SensorIcon />,
  Настройки: <ContactIcon />,
  Выйти: <ExitIcon />
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT })
});
class NavItem extends React.Component {
  render() {
    const { route, title, logout } = this.props;
    return logout ? (
      <ListItem button onClick={this.props.onClickLogout}>
        <ListItemIcon>{icon[title]}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    ) : (
      <ListItem button component={Link} to={route}>
        <ListItemIcon>{icon[title]}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NavItem);
