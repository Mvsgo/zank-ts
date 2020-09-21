import './Home.css';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import HomeRoutes from 'src/routes/home.routes';

import MainMenu from './MainMenu';

//import { Link } from 'react-router-dom';
//import { useAuth } from 'src/context/AuthContext';
//import MainMenu from './MainMenu';

const Home = () => {
  //const { logout } = useAuth();

  const itemMenu = (
    <div>
      <div>
        <Link to="/home/lista">Sistemas</Link>
      </div>
      <Divider />
      <Link to="/home/produtos">Produtos</Link>

      {/* <List>
        <ListItem button key={'Sistemas'} component={Link} to="/home/lista">
          <ListItemIcon>
            <TiThMenu />
          </ListItemIcon>
          <ListItemText primary={'Sistemas'} />
        </ListItem>
      </List>

      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <TiThMenu /> : <IoIosArrowBack />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    // <MainMenu itemMenu={itemMenu}>
    //   {/* <HomeRoutes /> */}
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    //   <div>
    //     <h1>Funcionou !@</h1>
    //   </div>
    // </MainMenu>

    <div className="container">
      <aside>
        <nav>
          <div>
            <Link to="/home/lista">Sistemas</Link>
          </div>
          <Link to="/home/produtos">Produtos</Link>
        </nav>
      </aside>

      <div className="content">
        <header>
          <h1>Funcionou !@</h1>
          {/* <button onClick={logout}>Logout</button> */}
        </header>
        <main>
          <HomeRoutes />
        </main>

        <footer>&reg; Siac Sistemas</footer>
      </div>
    </div>
  );
};

export default Home;
