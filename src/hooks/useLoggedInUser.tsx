import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { User as UserFirebase } from 'firebase/auth';

import { onAuthChanged } from '../utils/firebase';

type UserState = [UserFirebase | undefined, Dispatch<SetStateAction<UserFirebase | undefined>>];

const UserContext = createContext<UserState>(undefined as never);

export const UserProvider: FC = ({ children }) => {
  const userState = useState<UserFirebase>();

  useEffect(() => {
    onAuthChanged(u => userState[1](u ?? undefined));
  }, []);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const [user] = useContext(UserContext);
  return user;
};
