import React from 'react';
import HomeRoutes from 'src/routes/home.routes';

import MainMenu from './MainMenu';

const Home = () => {
  return (
    <MainMenu>
      <HomeRoutes />
    </MainMenu>
  );
};

export default Home;
