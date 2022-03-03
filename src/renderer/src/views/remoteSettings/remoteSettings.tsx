import * as React from 'react';

const {
  useRef, useState, useEffect, useMemo,
} = React;

interface RemoteSettingsProps {
}

const defaultProps: RemoteSettingsProps = {};

const RemoteSettings: React.FC<RemoteSettingsProps> = (props: RemoteSettingsProps = defaultProps) => (
  <>
    {' '}
    RemoteSettingsProps:
    {JSON.stringify(props)}
  </>
);

export default RemoteSettings;
