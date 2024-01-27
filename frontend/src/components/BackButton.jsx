import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className=" flex">
      <Link
        to={destination}
        className="bg-sky-500 text-white px- py-1 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-2xl"></BsArrowLeft>
      </Link>
    </div>
  );
};
export default BackButton;
