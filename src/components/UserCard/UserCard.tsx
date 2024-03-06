import "./style.css";

interface UserCardProps {
  image: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
  };
}

export const UserCard: React.FC<UserCardProps> = ({
  image,
  firstName,
  lastName,
  address,
}) => {
  return (
    <div className="userCard">
      <img className="userPic" src={image} alt={`${firstName} ${lastName}`} />
      <div className="userInfo">
        <div>{`${firstName} ${lastName}`}</div>
        <div>{address.city}</div>
      </div>
    </div>
  );
};
