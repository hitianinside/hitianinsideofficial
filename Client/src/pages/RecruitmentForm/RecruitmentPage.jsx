import React, { useContext } from 'react';
import RecruitmentForm from '../../components/RecruitmentForm/RecruitmentForm';
import { isAuthenticatedContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const RecruitmentPage = () => {
  const natigate = useNavigate();

  const { isAuthenticated } = useContext(isAuthenticatedContext);

  if(!isAuthenticated){
    natigate('/sign-up');
    return null;
  }
  
  return (
    <div>
      <RecruitmentForm />
    </div>
  )
}

export default RecruitmentPage;