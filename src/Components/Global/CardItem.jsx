import { Link } from 'react-router-dom';

const CardItem = (props) => {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <Link to={props.linkTo}>
        <img src={props.thumbn} className=" mb-2 rounded-md" />
      </Link>
      <h5 className="font-semibold">{props.title}</h5>
      <p className="text-sm">{props.year}</p>
    </div>
  );
};

export default CardItem;
