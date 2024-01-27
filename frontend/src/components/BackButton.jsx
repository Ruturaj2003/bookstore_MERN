import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className=" flex items-center">
      <Link
        to={destination}
        className="bg-sky-500 w-16 flex justify-center mt-8 text-white px-1 py-1 rounded-lg  transition-colors duration-500 hover:bg-sky-800"
      >
        <BsArrowLeft className="text-2xl"></BsArrowLeft>
      </Link>
    </div>
  );
};
export default BackButton;
