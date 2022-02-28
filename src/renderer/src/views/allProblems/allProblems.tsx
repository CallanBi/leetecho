import { useGetAllProblems } from '@/rendererApi/allProblems';
import { useGetAllTags } from '@/rendererApi/tags';
import * as React from 'react';
import {
} from "react-query";

const { useRef, useState, useEffect, useMemo } = React;


interface AllProblemsProp {
}

const defaultProps: AllProblemsProp = {};

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {

  // const allProblemsQuery = useGetAllProblems();
  // const allTagsQuery = useGetAllTags();

  return (
    <> AllProblemsProp props: {JSON.stringify(props)}</>
  );
};

export default AllProblems;
