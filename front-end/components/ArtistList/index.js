import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    artists {
      id
      name
      description
      avatar {
        url
      }
    }
  }
`;

function ArtistList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading artists";
  //if artists are returned from the GraphQL query, run the filter query
  //and set equal to variable artistSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.artists && data.artists.length) {
    //searchQuery
    const searchQuery = data.artists.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`http://localhost:1337${res.avatar.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/artists/${res.id}`}
                    href={`/artists?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No Artists Found</h1>;
    }
  }
  return <h5>Add Artists</h5>;
}
export default ArtistList;