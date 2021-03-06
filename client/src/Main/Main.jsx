import {Col, Container, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Profile from "./Profile/Profile";
import ItemPage from "./Items/ItemPage";
import NewsUsersTable from "./News/Users/NewsUsersTable";
import NewsItemsTable from "./News/Items/NewsItemsTable";
import NewsCollectionTable from "./News/Collections/NewsCollectionTable";

const Main = () => {
  return (
    <>
      <Header/>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidebar/>
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path='/' element={<NewsCollectionTable/>}/>
              <Route path='/news/items' element={<NewsItemsTable/>}/>
              <Route path='/news/users' element={<NewsUsersTable/>}/>
              <Route exact path={'/profile'} element={<Profile/>}/>
              <Route path={'/profile/:id'} element={<Profile/>}/>
              <Route path='/items/:id' element={<ItemPage/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Main