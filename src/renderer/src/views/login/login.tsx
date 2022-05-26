import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Badge, Button, Tooltip, Typography } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Logo } from '@/assets/logo-vertical.svg';
import { COLOR_PALETTE } from '../../../../const/theme/color';
import { AppStoreContext } from '../../store/appStore/appStore';

import LoginForm from './components/loginForm';
import TrafficLight from '@/components/trafficLight';
import { useCheckUpdate } from '@/rendererApi/user';
import { UseQueryResult } from 'react-query';
import { ReleaseTag } from 'src/main/idl/user';
import { checkNeedUpdate } from 'src/main/tools';

const { useRef, useState, useEffect, useMemo } = React;

const CheckUpdateSection = styled.section`
  display: inline-block;
`;

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

  const { state: appState } = React.useContext(AppStoreContext);

  const { appVersion = '' } = appState;

  const [checkUpdateRequestParams, setCheckUpdateRequestParams] = useState({
    enableRequest: true,
    onSuccess: () => {
      setCheckUpdateRequestParams({
        ...checkUpdateRequestParams,
        enableRequest: false,
      });
    },
    onError: () => {
      /** noop */
    },
  });

  const { isSuccess: isCheckUpdateSuccess, data: releaseData } = useCheckUpdate(
    checkUpdateRequestParams?.enableRequest,
    checkUpdateRequestParams?.onSuccess,
    checkUpdateRequestParams?.onError,
  ) as UseQueryResult<SuccessResp<ReleaseTag>['data'], Error>;

  const hasUpdate = useMemo(() => {
    const latest = releaseData?.name || '';

    return checkNeedUpdate(appVersion, latest);
  }, [appVersion, releaseData, releaseData?.name]);

  return (
    <>
      <LoginTrafficLightSection>
        {hasUpdate && isCheckUpdateSuccess && (
          <CheckUpdateSection>
            <Tooltip
              title={
                <section
                  css={css`
                    padding-left: 16px;
                  `}
                >
                  <section>
                    发现新版本 {releaseData?.name} ，推荐前往{' '}
                    <Typography.Link
                      href="https://callanbi.top/leetecho/"
                      target="_blank"
                      style={{
                        color: COLOR_PALETTE.LEETECHO_BLUE,
                      }}
                    >
                      官网
                    </Typography.Link>{' '}
                    下载
                  </section>
                </section>
              }
              placement="top"
            >
              <Button type="link">
                <Badge
                  status="processing"
                  size="default"
                  style={{
                    bottom: 3,
                  }}
                />
              </Button>
            </Tooltip>
          </CheckUpdateSection>
        )}
        <TrafficLight />
      </LoginTrafficLightSection>
      <LoginSection>
        <CSSTransition in={isFormShow} classNames="LoginLogoTransition" timeout={300}>
          <LogoSection>
            <Logo
              height={350}
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
                    top: 95,
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
