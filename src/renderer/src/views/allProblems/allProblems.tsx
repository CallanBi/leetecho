import { useGetAllProblems } from '@/rendererApi/allProblems';
import * as React from 'react';
import {
} from "react-query";

const { useRef, useState, useEffect, useMemo } = React;


interface AllProblemsProp {
}

const defaultProps: AllProblemsProp = {};

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {

  // const { status, data, error, isFetching } = useGetAllProblems();
  return (
    <> AllProblemsProp props: {JSON.stringify(props)}</>
  );
};

export default AllProblems;
