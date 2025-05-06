import AuthForm from './AuthForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const LoginPage = () => {
  useDocumentTitle('Login');
  return <AuthForm mode="login" />;
};

export default LoginPage;