import React from 'react';
import styled from 'styled-components';

interface Props{
  check: boolean;
}
const Switch = (
  {check}: Props
) => {
  return (
    <StyledWrapper>
      <div>
        <label className="switch">
          <input type="checkbox" checked={check}/>
          <span>
            <em />
            {/* <strong /> */}
          </span>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    height: 24px;
    display: block;
    position: relative;
    cursor: pointer;
  }
  .switch input {
    display: none;
  }
  .switch input + span {
    padding-left: 50px;
    min-height: 24px;
    line-height: 24px;
    display: block;
    color: #99a3ba;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    transition: color 0.3s ease;
  }
  .switch input + span:before,
  .switch input + span:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 12px;
  }
  .switch input + span:before {
    top: 0;
    left: 0;
    width: 42px;
    height: 24px;
    background: #e4ecfa;
    transition: all 0.3s ease;
  }
  .switch input + span:after {
    width: 18px;
    height: 18px;
    background: #fff;
    top: 3px;
    left: 3px;
    box-shadow: 0 1px 3px rgba(18, 22, 33, 0.1);
    transition: all 0.45s ease;
  }
  .switch input + span em {
    width: 8px;
    height: 7px;
    background: #99a3ba;
    position: absolute;
    left: 8px;
    bottom: 7px;
    border-radius: 2px;
    display: block;
    z-index: 1;
    transition: all 0.45s ease;
  }
  .switch input + span em:before {
    content: "";
    width: 2px;
    height: 2px;
    border-radius: 1px;
    background: #fff;
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    margin: -1px 0 0 -1px;
  }
  .switch input + span em:after {
    content: "";
    display: block;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid #99a3ba;
    border-bottom: 0;
    width: 6px;
    height: 4px;
    left: 1px;
    bottom: 6px;
    position: absolute;
    z-index: 1;
    transform-origin: 0 100%;
    transition: all 0.45s ease;
    transform: rotate(-35deg) translate(0, 1px);
  }
  .switch input + span strong {
    font-weight: normal;
    position: relative;
    display: block;
    top: 1px;
  }
  .switch input + span strong:before,
  .switch input + span strong:after {
    font-size: 14px;
    font-weight: 500;
    display: block;
    font-family: "Mukta Malar", Arial;
    -webkit-backface-visibility: hidden;
  }
  .switch input + span strong:before {
    content: "Unlocked";
    transition: all 0.3s ease 0.2s;
  }
  .switch input + span strong:after {
    content: "Locked";
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    color: #02923c;
    transition: all 0.3s ease;
    transform: translate(2px, 0);
  }
  .switch input:checked + span:before {
    background: #eae7e7;
  }
  .switch input:checked + span:after {
    background: #fff;
    transform: translate(18px, 0);
  }
  .switch input:checked + span em {
    transform: translate(18px, 0);
    background: #02923c;
  }
  .switch input:checked + span em:after {
    border-color: #02923c;
    transform: rotate(0deg) translate(0, 0);
  }
  .switch input:checked + span strong:before {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    transform: translate(-2px, 0);
  }
  .switch input:checked + span strong:after {
    opacity: 1;
    visibility: visible;
    transform: translate(0, 0);
    transition: all 0.3s ease 0.2s;
  }

  .switch :before,
  :after {
    box-sizing: border-box;
  }`;

export default Switch;
