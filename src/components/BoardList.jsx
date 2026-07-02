import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


export default function BoardList(){
    const simpleTest = () => {
        axios
  .get("https://localhost:3000/", {})
    
  .then((response) => {
    console.log(response.data);
    console.log("response.data");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Request completed");
  });
}


    return(
        <>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>선택</th>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
     
    </Table>
            <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={simpleTest}>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
            </div>
        </>
    );
}