import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete('http://localhost:5555/books/' + id).then(() => {
      setLoading(false);
      navigate('/');
    });
  };
  return (
    <div className="p-4">
      <BackButton></BackButton>
      {loading ? <Spinner></Spinner> : ''}
      <div className=" flex flex-col border-2  items-center  border-sky-500 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You Want To Delete This Book</h3>
        <button
          className="p-4 bg-red-300  hover:bg-red-800 text-white m-8  w-full"
          onClick={handleDeleteBook}
        >
          {' '}
          Yes Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteBook;
