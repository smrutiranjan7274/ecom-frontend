import AuthForm from './AuthForm';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const RegisterPage = () => {
  useDocumentTitle('Register');
  return <AuthForm mode="register" />;
};

export default RegisterPage;