import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { cn } from '@/lib';
import styled from 'styled-components';

import "@/utils/i18n";

const Switch = () => {
  const { i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
    setIsChecked(i18n.language === 'en'); 
  }, [i18n.language]);

  const handleChange = () => {
    const newLang = isChecked ? 'vi' : 'en';
    setIsChecked(!isChecked);
    i18n.changeLanguage(newLang);
  };

  if (!mounted) {
    return null; 
  }

  return (
    <StyledWrapper>
      <label className="switch-button" htmlFor="switch">
        <div className={cn(theme === 'dark' ? 'switch-outer-dark' : 'switch-outer',)}>
          <input 
            id="switch" 
            type="checkbox" 
            checked={isChecked}
            onChange={handleChange}
          />
          <div className="button">
            <span className="button-toggle">
              <Image
                width={500}
                height={500}
                alt="Vietnam Flag"
                src='/svg/VN.svg'
                className="imgVN"
              />
              <Image
                width={500}
                height={500}
                alt="English Flag"
                src='/svg/EN.svg'
                className="imgEN"
              />
            </span>
            <span className="button-indicator" />
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 42px;
  }

  .switch-button .switch-outer {
    height: 100%;
    background: #dfdfdf;
    width: 105px;
    border-radius: 165px;
    box-shadow: inset 0px 5px 10px 0px #969696, 0px 3px 6px -2px #757575;
    border: 1px solid #b1b1b1;
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .switch-button .switch-outer-dark {
    height: 100%;
    background: #252532;
    width: 105px;
    border-radius: 165px;
    box-shadow: inset 0px 5px 10px 0px #16151c, 0px 3px 6px -2px #403f4e;
    border: 1px solid #32303e;
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .switch-button .switch-outer input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }

  .switch-button .switch-outer-dark input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }



  .switch-button .switch-outer .button-toggle {
    top: -6.5px;
    height: 42px;
    width: 42px;
    border-radius: 100%;
    position: relative;
    transition: left 0.3s ease-in;
    left: 5px;
  }

  .switch-button .switch-outer-dark .button-toggle {
    top: -6.5px;
    height: 42px;
    width: 42px;
    border-radius: 100%;
    position: relative;
    transition: left 0.3s ease-in;
    left: 5px;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .button-toggle {
    left: 48%;
  }

    .switch-button
    .switch-outer-dark
    input[type="checkbox"]:checked
    + .button
    .button-toggle {
    left: 48%;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .button-indicator {
    animation: indicator 1s forwards;
  }
  .switch-button
    .switch-outer-dark
    input[type="checkbox"]:checked
    + .button
    .button-indicator {
    animation: indicator 1s forwards;
  }

  .switch-button .switch-outer .button {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  
  .switch-button .switch-outer-dark .button {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
  }

  .switch-button .switch-outer .button-indicator {
    height: 25px;
    width: 25px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 3px solid #ef565f;
    box-sizing: border-box;
    right: 3px;
    position: relative;
  }

  .switch-button .switch-outer-dark .button-indicator {
    height: 25px;
    width: 25px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 3px solid #ef565f;
    box-sizing: border-box;
    right: 3px;
    position: relative;
  }

  .imgEN {
    display: none;
    position: absolute;
  }

  .imgVN {
    display: block;
    position: absolute;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .imgEN {
    display: block;
  }

    .switch-button
    .switch-outer-dark
    input[type="checkbox"]:checked
    + .button
    .imgEN {
    display: block;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .imgVN {
    display: none;
  }

  .switch-button
    .switch-outer-dark
    input[type="checkbox"]:checked
    + .button
    .imgVN {
    display: none;
  }

  @keyframes indicator {
    30% {
      opacity: 0;
    }
    0% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      border: 3px solid #103B9B;
      left: -68%;
    }
  }
`;

export default Switch;
