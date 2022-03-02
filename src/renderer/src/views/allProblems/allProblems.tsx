import { useGetProblems } from '@/rendererApi/problems';
import { useGetAllTags } from '@/rendererApi/tags';
import { Table } from 'antd';
import * as React from 'react';
import {
} from "react-query";

import ProblemTable from '../login/components/problemTable';

const { useRef, useState, useEffect, useMemo } = React;



interface AllProblemsProp {
}

const defaultProps: AllProblemsProp = {};

const problemColumns = [];

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {

  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems({});

  console.log('%c getProblemsData.questions >>>', 'background: yellow; color: blue', getProblemsData?.questions);
  debugger;


  return (
    <><ProblemTable tableConst={{
      dataSource: getProblemsData?.questions || [],
    }} tableStatus={{
      isLoading: isGetProblemsLoading,
      pagination: {
        pageSize: 50,
        total: getProblemsData?.total || 0,
      }
    }}></ProblemTable></>
  );
};

export default AllProblems;
