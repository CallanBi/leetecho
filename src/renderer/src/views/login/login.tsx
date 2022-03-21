import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Button } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Logo } from '@/assets/logo-vertical.svg';
import { COLOR_PALETTE } from '../../../../const/theme/color';

import LoginForm from './components/loginForm';
import TrafficLight from '@/components/trafficLight';

const { useRef, useState, useEffect, useMemo } = React;

const LoginSection = styled.section`
  -webkit-app-region: drag;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  .LoginLogoTransition-enter {
    transform: translate(2%, 22%) scale(1.4);
  }

  .LoginLogoTransition-enter-active {
    transform: translate(2%, 10%) scale(1);
    transition: 'all 300ms';
  }

  .LoginLogoTransition-enter-done {
    transform: translate(2%, 10%) scale(1);
    transition: 'all 300ms';
  }
`;

const LoginFormSection = styled.section`
  -webkit-app-region: no-drag;
  width: 400px;
`;

const LoginTrafficLightSection = styled.section`
  -webkit-app-region: drag;
  display: flex;
  flex-direction: row-reverse;
`;

const Login: React.FC<{}> = () => {
  const [isFormShow, setIsFormShow] = useState(false);

  const LogoSection = React.useMemo(
    () => styled.section`
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: ${!isFormShow ? 'translate(2%, 35%) scale(1.6)' : 'translate(2%, 10%) scale(1)'};
      transition: all 300ms;
    `,
    [],
  );

  return (
    <>
      <LoginTrafficLightSection>
        <TrafficLight />
      </LoginTrafficLightSection>
      <LoginSection>
        <CSSTransition in={isFormShow} classNames="LoginLogoTransition" timeout={300}>
          <LogoSection>
            <Logo
              height={400}
              width={400}
              style={{
                marginLeft: 28,
              }}
              id="Logo"
            />
          </LogoSection>
        </CSSTransition>
        <LoginFormSection>
          {!isFormShow && (
            <section
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <Button
                style={
                  {
                    WebkitAppRegion: 'no-drag',
                    top: 70,
                  } as React.CSSProperties
                }
                type="link"
                onClick={() => {
                  setIsFormShow(true);
                }}
              >
                {'登录 >'}
              </Button>
            </section>
          )}
          {isFormShow && <LoginForm />}
        </LoginFormSection>
      </LoginSection>
    </>
  );
};

export default Login;
