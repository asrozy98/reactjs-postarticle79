import axios from 'axios'

export const GetArticles = 'GET_ARTICLES'
export const GetArticleById = 'GET_ARTICLE_BY_ID'
export const EditArticleById = 'EDIT_ARTICLE_BY_ID'
export const DeleteArticle = 'DELETE_ARTICLE'
export const CreateArticle = 'CREATE_ARTICLE'
export const UpdateArticle = 'UPDATE_ARTICLE'
export const OnArticleForm = 'ON_ARTICLE_FORM'
export const ConfirmDelete = 'CONFIRM_DELETE'
export const GetCountArticle = 'GET_COUNT_ARTICLE'

export const getArticles = (page, status) => {
  return (dispatch) => {
    dispatch({
      type: GetArticles,
      payload: {
        loading: true,
        error: false,
        message: false,
      },
    })
    axios
      .get('http://localhost:8080/article', {
        params: {
          page: page,
          limit: 10,
          status: status,
        },
      })
      .then((res) => {
        dispatch({
          type: GetArticles,
          payload: {
            loading: false,
            data: res.data.data,
            allCount: res.data.allCount,
            perPageCount: res.data.perPageCount,
            message: false,
            error: false,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: GetArticles,
          payload: {
            loading: false,
            data: false,
            error: err.message,
          },
        })
      })
  }
}

export const getCountArticle = () => {
  const statusTab = ['Publish', 'Draft', 'Trash']

  return (dispatch) => {
    statusTab.map((tab) => {
      axios
        .get('http://localhost:8080/article', {
          params: {
            page: 1,
            limit: 10,
            status: tab,
          },
        })
        .then((res) => {
          dispatch({
            type: GetCountArticle,
            payload: {
              status: tab,
              value: res.data.allCount,
            },
          })
        })
    })
  }
}

export const getArticleById = (id) => {
  return (dispatch) => {
    dispatch({
      type: GetArticleById,
      payload: {
        loading: true,
        message: false,
        error: false,
      },
    })
    axios
      .get('http://localhost:8080/article/' + id)
      .then((res) => {
        console.log('sfsdg::":', res.data.data)
        dispatch({
          type: GetArticleById,
          payload: {
            loading: false,
            title: res.data.data.title,
            content: res.data.data.content,
            category: res.data.data.category,
            created_at: res.data.data.created_date,
            updated_at: res.data.data.updated_date,
            // allCount: res.data.allCount,
            error: false,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: GetArticleById,
          payload: {
            loading: false,
            message: err.message,
            error: err.message,
          },
        })
      })
  }
}

export const deleteArticle = (id) => {
  return (dispatch) => {
    dispatch({
      type: DeleteArticle,
      payload: {
        loading: true,
        message: false,
        error: false,
      },
    })
    axios
      .delete('http://localhost:8080/article/' + id)
      .then((res) => {
        dispatch({
          type: DeleteArticle,
          payload: {
            loading: false,
            message: res.message,
            error: false,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: DeleteArticle,
          payload: {
            loading: false,
            message: false,
            error: err.message,
          },
        })
      })
  }
}

export const confirmDelete = (show, articleData) => {
  return (dispatch) => {
    console.log(articleData)
    dispatch({
      type: ConfirmDelete,
      payload: {
        show: show,
        articleData: articleData,
      },
    })
  }
}

export const onArticleForm = (value, inputType) => {
  console.log('log res:', value, inputType)

  return (dispatch) => {
    dispatch({
      type: OnArticleForm,
      payload: {
        field: inputType,
        value,
      },
    })
  }
}

export const createArticle = (article, status) => {
  return (dispatch) => {
    console.log(article)
    dispatch({
      type: CreateArticle,
      payload: {
        loading: true,
        message: false,
        error: false,
      },
    })

    axios
      .post('http://localhost:8080/article', {
        title: article.title,
        category: article.category,
        content: article.content,
        status: status,
      })
      .then((res) => {
        console.log('log res:', res.data)
        dispatch({
          type: CreateArticle,
          payload: {
            loading: false,
            message: res.data.message,
            error: false,
            title: '',
            category: '',
            content: '',
          },
        })
      })
      .catch((err) => {
        console.log('log err:', err)
        dispatch({
          type: CreateArticle,
          payload: {
            loading: false,
            message: err.response.data.message ?? err.message,
            error: err.response.data.error ?? false,
          },
        })
      })
  }
}

export const editArticleById = (id) => {
  return (dispatch) => {
    dispatch({
      type: EditArticleById,
      payload: {
        loading: true,
        message: false,
        error: false,
      },
    })
    axios
      .get('http://localhost:8080/article/' + id)
      .then((res) => {
        dispatch({
          type: EditArticleById,
          payload: {
            loading: false,
            title: res.data.data.title,
            category: res.data.data.category,
            content: res.data.data.content,
            error: false,
            message: false,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: EditArticleById,
          payload: {
            loading: false,
            message: err.message,
            error: err.message,
          },
        })
      })
  }
}

export const updateArticle = (id, article, status) => {
  return (dispatch) => {
    dispatch({
      type: UpdateArticle,
      payload: {
        loading: true,
        message: false,
        error: false,
      },
    })

    axios
      .patch('http://localhost:8080/article/' + id, {
        title: article.title,
        category: article.category,
        content: article.content,
        status: status,
      })
      .then((res) => {
        dispatch({
          type: UpdateArticle,
          payload: {
            loading: false,
            message: res.data.message,
            error: false,
          },
        })
      })
      .catch((err) => {
        dispatch({
          type: UpdateArticle,
          payload: {
            loading: false,
            message: err.response.data.message ?? err.message,
            error: err.response.data.error ?? false,
          },
        })
      })
  }
}
