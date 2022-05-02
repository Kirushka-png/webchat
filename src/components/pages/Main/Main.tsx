import { IUserData } from 'App';
import { Navigate, Route, Routes } from 'react-router-dom';


interface Props {
    userData: IUserData | null,
    onOpenChat(): any
}

export const Main = ({ userData, onOpenChat }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/main/home" replace />} />
        </Routes>
    )
}
export default Main