import { CreateBook, DeleteBook, EditBook, Home, ShowBook } from './pages';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/books/create" element={<CreateBook></CreateBook>} />

      <Route path="/books/details/:id" element={<ShowBook></ShowBook>} />

      <Route path="/books/edit/:id" element={<EditBook></EditBook>} />

      <Route path="/books/delete/:id" element={<DeleteBook></DeleteBook>} />
    </Routes>
  );
};
export default App;
