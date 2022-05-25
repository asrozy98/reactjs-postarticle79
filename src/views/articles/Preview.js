import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, updateArticle } from 'src/redux/actions/Articles'
import DeleteArticle from './DeleteArticle'
import CIcon from '@coreui/icons-react'
import { cilNewspaper, cilPencil, cilTrash } from '@coreui/icons'

const Preview = () => {
  const { loading, data, message, error } = useSelector((state) => state.ArticlesReducer)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  console.log('ini data:', data)
  useEffect(() => {
    dispatch(getArticles(page, 'Publish'))
    if (message) {
      dispatch(getArticles(page, 'Publish'))
    }
  }, [])

  const setStatus = (id, article, status) => {
    dispatch(updateArticle(id, article, status))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs="auto" className="me-auto">
                <strong>All Post Article</strong>
              </CCol>
              <CCol xs="auto">
                <CButton
                  color="primary"
                  to="/post/create"
                  component={NavLink}
                  className="text-white"
                >
                  Add New Post
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Content</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.allCount ? (
                  data.data.map((article, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{article.id}</CTableDataCell>
                      <CTableDataCell>
                        {article.title.length > 25
                          ? `${article.title.substring(0, 25)}....`
                          : article.title}
                      </CTableDataCell>
                      <CTableDataCell>{article.category}</CTableDataCell>
                      <CTableDataCell>
                        {article.content.length > 50
                          ? `${article.content.substring(0, 50)}....`
                          : article.content}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          to={`/post/preview/${article.id}`}
                          component={NavLink}
                          className="text-white"
                        >
                          <CIcon icon={cilNewspaper} size="lg" />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : loading ? (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      <CSpinner color="primary" />
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      {error ? error : 'No Data'}
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            {data.allCount !== 0 && (
              <CPagination align="center" aria-label="Page navigation example">
                {page < 2 ? (
                  <CPaginationItem disabled>Previous</CPaginationItem>
                ) : (
                  <CPaginationItem onClick={() => setPage(page - 1)}>Previous</CPaginationItem>
                )}
                <CPaginationItem>{page}</CPaginationItem>
                {data.allCount % data.perPageCount === 0 ? (
                  <CPaginationItem disabled>Next</CPaginationItem>
                ) : (
                  <CPaginationItem
                    onClick={() => {
                      setPage(page + 1)
                    }}
                  >
                    Next
                  </CPaginationItem>
                )}
              </CPagination>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <DeleteArticle />
    </CRow>
  )
}

export default Preview
