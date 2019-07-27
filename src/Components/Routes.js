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
    <Route exact path="/admin" component={EmailSender} />
    <Route path="/admin/Posts" component={() => <ArticleList type="Post" />} />
    <Route path="/admin/newPost" component={() => <ArticleEditor type="Post" />} />
    <Route path="/admin/Settings" component={Settings} />
    <Route path="/admin/Content" component={Content} />
    <Route path="/admin/SensorData" component={SensorData} />

    <Route path="/admin/Projects" component={() => <ArticleList type="Project" />} />
    <Route
      path="/admin/newProject"
      component={() => <ArticleEditor type="Project" />}
    />
    <Route
      path="/admin/Project/:id"
      component={e => <ArticleEditor type="Project" id={e.match.params.id} />}
    />
    <Route
      path="/admin/Post/:id"
      component={e => <ArticleEditor type="Post" id={e.match.params.id} />}
    />
    <Route
      path="/admin/Tenants"
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
