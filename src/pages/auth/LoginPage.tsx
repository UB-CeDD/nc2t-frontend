import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AuthLayout from '@components/layouts/AuthLayout';
import {login, validateToken} from '../../store/thunks/authThunks';
import {RootState} from '../../store/reducers';
import Spinner from '@components/commons/Spinner';
import '../../i18n';

const LoginPage: React.FC = () => {
    const {t} = useTranslation();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const loginError = useSelector((state: RootState) => state.auth.error);
    const {user} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(validateToken());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/dashboard/admin');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        if (loginError) {
            setError(t('login.error'));
            setLoading(false);
        }
    }, [loginError, t]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(login(username, password));
        setLoading(false);
    };

    return (
        <AuthLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl flex justify-center font-bold mb-4">{t('auth.login')}</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700">{t('auth.username')}</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">{t('auth.password')}</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded btn btn-primary"
                                disabled={loading}>
                            {loading ? <Spinner size={1} color="1D8C84"/> : t('auth.loginButton')}
                        </button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;