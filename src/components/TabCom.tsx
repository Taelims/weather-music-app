import React from 'react'
import { Badge } from 'react-bootstrap'



function TabCom() {
  return (
    <div style={{ display: 'flex' , gridGap: '30px'}}>
      <h3>
        <Badge bg="dark">운동</Badge>
      </h3>
      <h3>
        <Badge bg="dark">행복한기분</Badge>
      </h3>
      <h3>
        <Badge bg="dark">집중</Badge>
      </h3>
      <h3>
        <Badge bg="dark">휴식</Badge>
      </h3>
      <h3>
        <Badge bg="dark">에너지</Badge>
      </h3>
      <h3>
        <Badge bg="dark">잠잘 때</Badge>
      </h3>
    </div>
  );
}

export default TabCom;