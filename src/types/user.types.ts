import { Session } from 'next-auth';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface IAuth {
    isAuth: boolean;
    status: SessionStatus;
    session: Session | null;
    setAuthState: (status: SessionStatus, session: Session | null) => void;
}
