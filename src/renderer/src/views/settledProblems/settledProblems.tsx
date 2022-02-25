import { Input } from 'antd';
import * as React from 'react';

const { useRef, useState, useEffect, useMemo } = React;

interface SettledProblemsProps {
}

debugger;

const defaultProps: SettledProblemsProps = {};

const SettledProblems: React.FC<SettledProblemsProps> = (props: SettledProblemsProps = defaultProps) => {
  debugger;
  return (
    <><Input placeholder={JSON.stringify(props)}></Input></>
  );
};

export default SettledProblems;
