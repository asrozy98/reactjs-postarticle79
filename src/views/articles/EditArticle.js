import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { editArticleById, onArticleForm, updateArticle } from 'src/redux/actions/Articles'
import { NavLink, useParams } from 'react-router-dom'

const EditUser = () => {
  let params = useParams()
  const dispatch = useDispatch()
  const { articleForm, loading, error, message } = useSelector((state) => state.ArticlesReducer)

  useEffect(() => {
    dispatch(editArticleById(params.id))
  }, [dispatch, params.id])

  const handleChange = (value, inputType) => {
    dispatch(onArticleForm(value, inputType))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Post {params.id}</strong>
          </CCardHeader>
          <CCardBody>
            {message && <div className="alert alert-warning">{message}</div>}
            {error && Array.isArray(error)
              ? error.map((item, index) => (
                  <div key={index} className="alert alert-danger">
                    {item}
                  </div>
                ))
              : error && <div className="alert alert-danger">{error}</div>}
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  value={articleForm.title}
                  placeholder="Title"
                  onInput={(e) => handleChange(e.target.value, 'title')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="category"
                  value={articleForm.category}
                  placeholder="Category"
                  onInput={(e) => handleChange(e.target.value, 'category')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Content</CFormLabel>
                <CFormTextarea
                  id="content"
                  rows="3"
                  text="Must be 8-20 words long."
                  value={articleForm.content}
                  placeholder="Content"
                  onInput={(e) => handleChange(e.target.value, 'content')}
                ></CFormTextarea>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            {loading ? (
              <CButton color="primary" className="float-end" disabled>
                <CSpinner component="span" size="sm" aria-hidden="true" />
                Loading...
              </CButton>
            ) : (
              <>
                <CButton color="secondary" to="/post" component={NavLink}>
                  Cancel
                </CButton>
                <CButtonToolbar
                  role="group"
                  aria-label="Toolbar with button groups"
                  className="float-end"
                >
                  <CButtonGroup className="me-2" role="group" aria-label="First group">
                    <CButton
                      color="success"
                      onClick={() => {
                        dispatch(updateArticle(params.id, articleForm, 'Publish'))
                      }}
                    >
                      Publish
                    </CButton>
                  </CButtonGroup>
                  <CButtonGroup className="me-2" role="group" aria-label="First group">
                    <CButton
                      color="primary"
                      onClick={() => {
                        dispatch(updateArticle(params.id, articleForm, 'Draft'))
                      }}
                    >
                      Draft
                    </CButton>
                  </CButtonGroup>
                </CButtonToolbar>
              </>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditUser
