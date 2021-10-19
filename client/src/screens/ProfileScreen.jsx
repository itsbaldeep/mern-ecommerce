import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      Name: {user.name}
      Email: {user.email}
    </div>
  );
};

export default ProfileScreen;
