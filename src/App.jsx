
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './components/BoardList';
import Write from './components/Write';
import { Routes, Route, useNavigate } from 'react-router';
import View from './components/View';
import { useState } from "react";


function App() {
  const [boardId, setBoardId] = useState(0);
  const [isModifyMode, setModifyMode] = useState(false);
   const navigate = useNavigate();

  const handleModify = _id => {
     setBoardId(_id);
     setModifyMode(true);
     navigate("/write");
  }
  const handleCancel = ()=>{
    setBoardId(0);
    setModifyMode(false);
  }
  
  return (
    <div className="container">
      <h1>React BBS</h1>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/write" element={<Write isModifyMode={isModifyMode} 
        boardId={boardId} handleCancel={handleCancel} />} />
        
       <Route path="/view/:id" element={<View handleModify={handleModify} />} /> 
    </Routes>
    
   </div>
    
  );
}

export default App;
