import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { editUserName, fetchUserName } from '../../../apis/apis';
import cancelBtn from '../../../assets/images/cancel-btn.svg';
import alertInfoIco from '../../../assets/images/circle-alert.svg';

function UserNameForm() {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [storedValue] = useLocalStorage('USER_TOKEN');

  const {
    isLoading,
    data: userName,
    refetch,
  } = useQuery({
    queryKey: ['userName', storedValue],
    queryFn: () => fetchUserName(storedValue.access),
  });

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setInputValue('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirm = confirm(`정말로 닉네임을 ${inputValue}로 변경하시겠어요?`);

    if (userConfirm) {
      editUserName(inputValue, storedValue.access);
      setInputValue('');
      refetch();
    }

    setInputValue('');
  };

  const handleKeyDown = (e) => {
    // 만약 입력키가 Enter 이면서, 유효성검증에 실패했을 경우(false)
    if (e.key === 'Enter' && !isInputValid) {
      e.preventDefault();
      setErrorMessage('올바르지 않은 닉네임입니다.');
    }
  };

  const validateNickName = (nickname) => {
    if (nickname === '') {
      setErrorMessage('');
      return false;
    }

    const specialCharRegex = /[^ㄱ-ㅎ가-힣a-zA-Z0-9]/;
    if (specialCharRegex.test(nickname)) {
      setErrorMessage('특수문자를 포함하지 않아야 합니다.');
      return false;
    }

    const lengthRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,8}$/;
    if (!lengthRegex.test(nickname)) {
      setErrorMessage('닉네임은 2자 이상, 8자 이하로 입력해주세요.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  useEffect(() => {
    const isValid = validateNickName(inputValue);
    setIsInputValid(isValid);
  }, [inputValue]);

  return (
    <form>
      {isLoading ? (
        <UserNameInputSkeleton />
      ) : (
        <UserNameInput
          type="text"
          placeholder={userName}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          maxLength={8}
          $errorMessage={errorMessage}
        />
      )}
      {isInputValid && <SubmitButton onClick={handleSubmit}>닉네임 정하기 완료</SubmitButton>}

      <ValidAlert>
        {!isInputValid && errorMessage && (
          <>
            <img src={alertInfoIco} alt="경고아이콘" />
            <p>{errorMessage}</p>
          </>
        )}
      </ValidAlert>

      <UnDoButton onClick={handleCancelButton}>
        <img src={cancelBtn} alt="입력취소" />
      </UnDoButton>
    </form>
  );
}

export default UserNameForm;

const stretchInput = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const displayCancelBtn = keyframes`
    0% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

const UserNameInput = styled.input`
  width: 100%;
  font-size: 24px;
  text-align: center;
  padding: 0.4rem;
  outline: none;
  color: ${({ $errorMessage }) => (!$errorMessage ? 'black' : 'red')};
  border-bottom: ${({ $errorMessage }) => (!$errorMessage ? '1px solid black' : '1px solid red')};
  animation: ${stretchInput} 1s ease-in-out forwards;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const UserNameInputSkeleton = styled.div`
  width: 100%;
  height: 42.78px;
  border-radius: 12px;
  background-color: #cecece;
  animation: ${pulse} 0.5s ease-in-out infinite;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 64px;
  font-size: 1rem;
  position: absolute;
  top: 60px;
  left: 0;
  animation: none;
  color: white;
  background-color: #2f2f2f;

  &:hover {
    background-color: #434343;
  }
`;

const ValidAlert = styled.div`
  width: 100%;
  min-height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 8px;

  img {
    width: 24px;
  }
  p {
    color: #eb3030;
  }

  @media (max-width: 480px) {
    img {
      width: 18px;
    }
    p {
      font-size: 12px;
      color: #eb3030;
    }
  }
`;

const UnDoButton = styled.button`
  position: absolute;
  top: 10%;
  right: 7px;
  animation: ${displayCancelBtn} 2s ease-in-out forwards;

  img {
    filter: brightness(100%);
    transition: filter 0.3s ease;
  }
  img:hover {
    filter: brightness(80%);
    transition: filter 0.3s ease;
  }

  @media (max-width: 480px) {
    top: 5%;
  }
`;
