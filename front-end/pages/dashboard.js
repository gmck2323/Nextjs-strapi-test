import React, { useContext } from "react";

import { Row, Col, Container } from "reactstrap";
import ChartGroup from "../components/dashboard/ChartGroup";
import LineChart from '../components/dashboard/LineChart';



function Dashboard() {
  
  return (
    <Container>
    <Row>
      <Col sm={{size: 'auto', offset:1}}>
        <h1 style={{ margin: 20 }}>DashBoard</h1>
      <ChartGroup />
      </Col>
    </Row>
    <Row>
    <Col style={{
                    margin: '0 0 16px 24px',
                    fontWeight: 400,
                    color: '#555',
                    lineHeight: '18px',
                    textAlign: 'center',
                    fontSize: '22px'
                }}
            >
                Test Artist Sales + Category

        </Col>
    </Row>
    <LineChart />
    </Container>
  );

}
export default Dashboard;