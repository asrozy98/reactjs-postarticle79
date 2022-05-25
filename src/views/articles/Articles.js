import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
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
import { getArticles, getCountArticle, updateArticle } from 'src/redux/actions/Articles'
import DeleteArticle from './DeleteArticle'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const Articles = () => {
  const { loading, data, message, error, articleCount } = useSelector(
    (state) => state.ArticlesReducer,
  )
  const [tabDefault, setTabDefault] = useState('Publish')
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles(page, tabDefault))
    dispatch(getCountArticle())
    if (message) {
      dispatch(getArticles(page, tabDefault))
      dispatch(getCountArticle())
    }
  }, [])

  const statusTab = ['Publish', 'Draft', 'Trash']

  const handleTab = (tab) => {
    setTabDefault(tab)
    dispatch(getArticles(1, tab))
  }

  const setStatus = (id, article, status) => {
    dispatch(updateArticle(id, article, status))
  }

  const count = (tab) => {
    if (tab === 'Publish') {
      return articleCount.Publish
    } else if (tab === 'Draft') {
      return articleCount.Draft
    } else {
      return articleCount.Trash
    }
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
            <CNav variant="tabs">
              {statusTab.map((tab) => (
                <CNavItem key={tab}>
                  <CNavLink active={tab === tabDefault} onClick={() => handleTab(tab)}>
                    {tab} <CBadge color="primary">{count(tab)}</CBadge>
                  </CNavLink>
                </CNavItem>
              ))}
            </CNav>
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
                          to={`/post/edit/${article.id}`}
                          component={NavLink}
                          className="text-white"
                        >
                          <CIcon icon={cilPencil} size="lg" />
                        </CButton>
                        <CButton
                          color="danger"
                          className="text-white"
                          onClick={() => setStatus(article.id, article, 'Trash')}
                        >
                          <CIcon icon={cilTrash} size="lg" />
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

export default Articles
