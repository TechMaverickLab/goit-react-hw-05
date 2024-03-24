import { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationContext from './NavigationContext';

export const NavigationProvider = ({ children }) => {
  const [prevPath, setPrevPath] = useState('/');

  return (
    <NavigationContext.Provider value={{ prevPath, setPrevPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
