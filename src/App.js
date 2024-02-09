
import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Welcome from './pages/Welcome';
import TestInstructions from './pages/TestInstructions'
import Questions from './pages/Questions';
import Result from './pages/Result';
import EmailVerification from './pages/EmailVerification';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
        <Routes>
          <Route path="/verify/:token" element={<EmailVerification />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        <Routes>
          <Route path="/testinstruction" element={<PrivateRoute component={<TestInstructions />} />} />
        </Routes>
        <Routes>
          <Route path="/questions" element={<PrivateRoute component={<Questions />} />} />
        </Routes>
        <Routes>
          <Route path="/result" element={<PrivateRoute component={<Result />} />} />
        </Routes>


      </Router>
      <Toaster />
    </>
  );
}

export default App;
