import React, {useCallback} from "react";
import CollectionRow from "./CollectionRow";
import {getCollectionListSelect} from "../../../redux/selectors/collection-select";
import {compose} from "redux";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {deleteCollectionThunk} from "../../../redux/collectionsReducer";

const CollectionTable = (props) => {
  const deleteCollection = useCallback((collectionId) => {
    props.deleteCollectionThunk(props.iToken, collectionId)
  }, [props.iToken])

  return (
    <table className="table text-center">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Date Create</th>
        <th scope="col">Topic</th>
        <th scope="col">Size</th>
        <th scope="col">Tools</th>
      </tr>
      </thead>
      <tbody>
      {props.collectionList.map(collection => <CollectionRow key={collection._id} deleteCollection={deleteCollection}
                                                                    collection={collection}/>)}
      </tbody>
    </table>
  )
}


const mapStateToProps = (state) => ({
  collectionList: getCollectionListSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {deleteCollectionThunk}),
)(CollectionTable)