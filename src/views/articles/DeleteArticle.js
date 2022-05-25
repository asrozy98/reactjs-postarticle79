import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmDelete, deleteArticle } from 'src/redux/actions/Articles'

const DeleteArticle = () => {
  const dispatch = useDispatch()
  const { articleDelete } = useSelector((state) => state.ArticlesReducer)
  return (
    <CModal
      alignment="center"
      visible={articleDelete.show}
      onClose={() => dispatch(confirmDelete(false, null))}
    >
      <CModalHeader onClose={() => dispatch(confirmDelete(false, null))}>
        <CModalTitle>Confirm Delete Article</CModalTitle>
      </CModalHeader>
      {articleDelete.articleData && (
        <CModalBody>
          Are you sure you want to delete article: {articleDelete.articleData.title}?
        </CModalBody>
      )}
      <CModalFooter>
        <CButton color="secondary" onClick={() => dispatch(confirmDelete(false, null))}>
          Close
        </CButton>
        <CButton
          color="danger"
          onClick={() => {
            dispatch(deleteArticle(articleDelete.articleData.id))
            dispatch(confirmDelete(false, null))
          }}
        >
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteArticle
