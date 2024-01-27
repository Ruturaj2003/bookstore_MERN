import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [dota, setDota] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((resp) => {
        if (!resp.data.data) {
          return;
        }
        setBooks(resp.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-enter">
        <h1 className="text-3xl my-8">
          <Link to="/books/create">
            <MdOutlineAddBox></MdOutlineAddBox>
          </Link>
        </h1>
      </div>
      {laoding ? (
        <Spinner></Spinner>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => {
              return (
                <tr key={book._id} className="h-8">
                  <td
                    className="border border-slate-800
                  rounded-md text-center"
                  >
                    {index + 1}
                  </td>
                  <td
                    className="border border-slate-800
                  rounded-md text-center"
                  >
                    {book.title}
                  </td>
                  <td
                    className="border border-slate-800
                  rounded-md text-center max-md:hidden"
                  >
                    {book.author}
                  </td>
                  <td
                    className="border border-slate-800
                  rounded-md text-center max-md:hidden"
                  >
                    {book.publishYear}
                  </td>
                  <td
                    className="border border-slate-800
                  rounded-md text-center"
                  >
                    <div className="flex justify-center gap-x-4">
                      <Link to={'/books/details/' + book._id}>
                        <BsInfoCircle className="text-2xl text-green-500"></BsInfoCircle>
                      </Link>
                      <Link to={'/books/edit/' + book._id}>
                        <AiOutlineEdit className="text-2xl text-yellow-500"></AiOutlineEdit>
                      </Link>
                      <Link to={'/books/delete/' + book._id}>
                        <MdOutlineDelete className="text-2xl text-red-500"></MdOutlineDelete>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Home;
