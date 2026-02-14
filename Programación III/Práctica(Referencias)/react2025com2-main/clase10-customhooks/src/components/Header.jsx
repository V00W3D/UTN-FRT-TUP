import {Row,Col,Button} from "react-bootstrap"
import authStore from "../store/authStore"

const Header = () => {

    const {user ,logoutUser} = authStore()

  return (
    <div className='bg-info'>
        <br />
        <Row>
            <Col md={6} xs={12}>
            {user &&  <h3>logueado...</h3>}
           
            </Col>
            <Col md={6} xs={12}>
            {user && <Button className="btn btn-danger" onClick={logoutUser}>logout</Button>}
            
            </Col>     
        </Row>

        <br />
    </div>
  )
}

export default Header