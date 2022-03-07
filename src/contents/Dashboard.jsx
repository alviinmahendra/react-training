import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.appStore.user);

  return (
    <div>
      Hello,&nbsp;
      {/* eslint-disable-next-line */}
      <b>{user.name}</b>!
    </div>
  );
};

export default Dashboard;
