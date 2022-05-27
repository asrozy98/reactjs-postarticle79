import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleById } from 'src/redux/actions/Articles'
import DeleteArticle from './DeleteArticle'
import moment from 'moment'

const PreviewItem = () => {
  let params = useParams()
  moment.locale('id')
  const { articleForm } = useSelector((state) => state.ArticlesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticleById(params.id))
  }, [dispatch, params.id])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <blockquote className="blockquote mb-0">
              <p>
                <b>{articleForm.title}</b>
              </p>
              <footer className="blockquote-footer">
                Posted on:{' '}
                <cite title="Source Title">
                  {moment(articleForm.created_at).format('D MMMM YYYY')}
                </cite>
              </footer>
            </blockquote>
          </CCardHeader>
          <CCardBody>
            <blockquote className="blockquote mb-0">
              <p>{articleForm.content}</p>
            </blockquote>
          </CCardBody>
          <CCardFooter>
            <CButton color="primary" component={NavLink} to={'/post/preview'}>
              Back
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <DeleteArticle />
    </CRow>
  )
}

export default PreviewItem
