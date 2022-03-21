import { Input } from 'antd';
import * as React from 'react';

const {
  useRef, useState, useEffect, useMemo,
} = React;

interface SettledProblemsProps {
}

const defaultProps: SettledProblemsProps = {};

const SettledProblems: React.FC<SettledProblemsProps> = (props: SettledProblemsProps = defaultProps) => (
  <Input placeholder={JSON.stringify(props)} />
);

export default SettledProblems;
