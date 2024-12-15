import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'popstate-direction';

const ForwardHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const forwardHandler = (e: Event) => {
      e.preventDefault();
      navigate(-1);
    };
    window.addEventListener('forward', forwardHandler);
    return () => {
      window.removeEventListener('forward', forwardHandler);
    };
  }, [navigate]);
  return null;
};
export default ForwardHandler;
