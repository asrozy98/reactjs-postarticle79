import {
  GetArticles,
  ConfirmDelete,
  CreateArticle,
  OnArticleForm,
  UpdateArticle,
  DeleteArticle,
  GetCountArticle,
  GetArticleById,
  EditArticleById,
} from '../actions/Articles'

const initialState = {
  loading: false,
  data: {
    data: [],
    allCount: 0,
    perPageCount: 0,
  },
  message: false,
  error: false,
  articleForm: {
    title: '',
    category: '',
    content: '',
    created_at: false,
    updated_at: false,
  },
  articleCount: {
    Publish: 0,
    Trash: 0,
    Draft: 0,
  },
  articleDelete: {
    show: false,
    articleData: null,
  },
}

const articles = (state = initialState, action) => {
  switch (action.type) {
    case GetArticles:
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        message: action.payload.message,
        data: {
          ...state.data,
          data: action.payload.data,
          allCount: action.payload.allCount,
          perPageCount: action.payload.perPageCount,
        },
      }
    case GetArticleById:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
        articleForm: {
          ...state.articleForm,
          title: action.payload.title,
          category: action.payload.category,
          content: action.payload.content,
          created_at: action.payload.created_at,
          updated_at: action.payload.updated_at,
        },
      }
    case GetCountArticle:
      return {
        ...state,
        articleCount: {
          ...state.articleCount,
          [action.payload.status]: action.payload.value,
        },
      }
    case DeleteArticle:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
      }
    case OnArticleForm:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
        articleForm: {
          ...state.articleForm,
          [action.payload.field]: action.payload.value,
        },
      }
    case CreateArticle:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
        articleForm: {
          ...state.articleForm,
          title: action.payload.title,
          category: action.payload.category,
          content: action.payload.content,
        },
      }
    case EditArticleById:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
        articleForm: {
          ...state.articleForm,
          title: action.payload.title,
          category: action.payload.category,
          content: action.payload.content,
        },
      }
    case UpdateArticle:
      return {
        ...state,
        loading: action.payload.loading,
        message: action.payload.message,
        error: action.payload.error,
        articleForm: {
          ...state.articleForm,
          title: action.payload.title,
          category: action.payload.category,
          content: action.payload.content,
          status: action.payload.status,
        },
      }
    case ConfirmDelete:
      return {
        ...state,
        articleDelete: {
          show: action.payload.show,
          articleData: action.payload.articleData,
        },
      }
    default:
      return state
  }
}

export default articles
