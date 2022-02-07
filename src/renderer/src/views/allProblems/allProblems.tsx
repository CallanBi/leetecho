import * as React from 'react';

const { useRef, useState, useEffect, useMemo } = React;


interface AllProblemsProp {
}

const defaultProps: AllProblemsProp = {};

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {

  return (
    <> AllProblemsProp props: {JSON.stringify(props)}</>
  );
};

export default AllProblems;
