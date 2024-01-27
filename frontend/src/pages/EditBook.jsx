import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleSaveBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put('http://localhost:5555/books/' + id, data).then(() => {
      setLoading(false);
      navigate('/');
    });
  };
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-5 ">Edit Book</h1>
          <form className="border-2 flex flex-col justify-center items-center border-red-500 p-4">
            <input
              value={title}
              type="text"
              placeholder="Title"
              required
              className="border-2 border-blue-800 p-2 m-4"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              value={author}
              type="text"
              placeholder="Author"
              className="border-2 border-blue-800 p-2 m-4"
              required
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
            <input
              value={publishYear}
              placeholder="Publish Year"
              className="border-2 border-blue-800 p-2 m-4"
              type="number"
              required
              onChange={(e) => setPublishYear(e.target.value)}
            ></input>

            <button
              type="submit"
              className="border-2 border-green-800 rounded-xl px-4"
              onClick={handleSaveBook}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default EditBook;
