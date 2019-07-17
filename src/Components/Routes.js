import React from "react";
import { Route } from "react-router-dom";
import Settings from "./Settings";
import Tenants from "./Tenants";
import EmailSender from "./EmailSender";
import {
  editTableColumns,
  editTableColumnExtensions,
  editRowId
} from "./Tenants/columnSettings";
import ArticleList from "./Articles/ArticleList";
import ArticleEditor from "./Articles/ArticleEditor";
import Content from "./Content";
import SensorData from "./SensorData";

export default () => (
  <React.Fragment>
    <Route exact path="/" component={EmailSender} />
    <Route path="/Posts" component={() => <ArticleList type="Post" />} />
    <Route path="/newPost" component={() => <ArticleEditor type="Post" />} />
    <Route path="/Settings" component={Settings} />
    <Route path="/Content" component={Content} />
    <Route path="/SensorData" component={SensorData} />

    <Route path="/Projects" component={() => <ArticleList type="Project" />} />
    <Route
      path="/newProject"
      component={() => <ArticleEditor type="Project" />}
    />
    <Route
      path="/Project/:id"
      component={e => <ArticleEditor type="Project" id={e.match.params.id} />}
    />
    <Route
      path="/Post/:id"
      component={e => <ArticleEditor type="Post" id={e.match.params.id} />}
    />
    <Route
      path="/Tenants"
      component={() => (
        <Tenants
          columns={editTableColumns}
          tableColumnExtensions={editTableColumnExtensions}
          getRowId={editRowId}
        />
      )}
    />
  </React.Fragment>
);
