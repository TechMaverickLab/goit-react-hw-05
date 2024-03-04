import { useContext } from 'react';
import NavigationContext from './NavigationContext';

const useNavigation = () => useContext(NavigationContext);

export default useNavigation;
