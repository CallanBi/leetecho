import * as React from 'react';
import { jsx, css } from '@emotion/react';
const { useRef, useState, useEffect, useMemo } = React;



interface NavFooterProps {

}

const defaultProps: NavFooterProps = {};

const NavFooter: React.FC<NavFooterProps> = (props: React.PropsWithChildren<NavFooterProps> = defaultProps) => {
  return (<> NavFooter </>);
};

export default NavFooter;
