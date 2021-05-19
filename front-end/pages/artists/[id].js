import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

import Cart from "../../components/cart";
import AppContext from "../../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_Artists_Pieces = gql`
  query($id: ID!) {
    artist(id: $id) {
      id
      name
      paintings {
        id
        title
        category
        price
        image {
          url
        }
      }
    }
  }
`;

function Artists(props) {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_Artists_Pieces, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Paintings";
  if (loading) return <h1>Loading ...</h1>;
  if (data.artist) {
    const { artist } = data;
    return (
      <>
        <h1>{artist.name}</h1>
        <Row>
          {artist.paintings.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`http://localhost:1337${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.title}</CardTitle>
                  <CardText>{res.category}</CardText>
                  <CardText>${res.price}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button 
                    outline 
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  }
  return <h1>Add Art</h1>;
}
export default Artists;