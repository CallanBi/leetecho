import * as React from 'react';

const { useRef, useState, useEffect, useMemo } = React;


interface DefaultTemplateProps {
}

const defaultProps: DefaultTemplateProps = {};

const DefaultTemplate: React.FC<DefaultTemplateProps> = (props: DefaultTemplateProps = defaultProps) => {

  return (
    <> DefaultTemplate props: {JSON.stringify(props)}</>
  );
};

export default DefaultTemplate;
