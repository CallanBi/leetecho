import { Spin, Table } from 'antd';
import * as React from 'react';
import Loading from '@/components/loading';
import { useGetProblems } from '@/rendererApi/problems';
import { useGetAllTags } from '@/rendererApi/tags';
import {
} from 'react-query';

import ProblemTable from '../../components/problemTable';

const {
  useRef, useState, useEffect, useMemo,
} = React;

interface AllProblemsProp {
}

const defaultProps: AllProblemsProp = {};


const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {
  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems({});

  console.log('%c getProblemsData.questions >>>', 'background: yellow; color: blue', getProblemsData?.questions);

  return (
    <ProblemTable
      tableConst={{
        dataSource: getProblemsData?.questions || [],
      }}
      tableStatus={{
        isLoading: { indicator: Loading, spinning: isGetProblemsLoading },
        pagination: {
          pageSize: 50,
          total: getProblemsData?.total || 0,
        },
      }}
    />
  );
};

export default AllProblems;
