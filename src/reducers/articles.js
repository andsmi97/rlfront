import {
  ARTICLES_PAGE_LOADED,
  ARTICLES_PAGE_UNLOADED,
  ARTICLESEDITOR_PAGE_LOADED,
  ARTICLESEDITOR_PAGE_UNLOADED,
  ASYNC_START,
  ARTICLE_DELETED,
  ARTICLE_CHANGED
} from "../constants/actionTypes";
const initialState = {
  body: "",
  articles: [],
  isPending: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ARTICLE_DELETED:
      return {
        ...state,
        articles: state.articles.filter(article => article._id !== action.id)
      };
    case ARTICLE_CHANGED:
      return { ...state, body: action.payload };
    case ASYNC_START:
      return { ...state, isPending: true };
    case ARTICLES_PAGE_LOADED:
      return { ...state, articles: action.payload, isPending: false };
    case ARTICLESEDITOR_PAGE_LOADED:
      return { ...state, body: action.payload.body, isPending: false };
    case ARTICLES_PAGE_UNLOADED:
    case ARTICLESEDITOR_PAGE_UNLOADED:
      return { ...initialState };
    default:
      return state;
  }
};
