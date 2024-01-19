import React from 'react';
import classes from './Header.module.css';
import CartButton from './CartButton';

const Header = (props) => {
 

  return (
    <header className={classes.header}>
      <h1>Medicine</h1>
      <CartButton onClick={props.onShowCart} />
    </header>
  );
};

export default Header;
