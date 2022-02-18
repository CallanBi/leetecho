import * as React from 'react';

const { useRef, useState, useEffect, useMemo } = React;


interface HeaderProps {

}

const defaultProps: HeaderProps = {};

const header: React.FC<HeaderProps> = (props: React.PropsWithChildren<HeaderProps> = defaultProps) => {
  const { } = props;

  return (
    <>Header</>
  );
};

export default Header;
