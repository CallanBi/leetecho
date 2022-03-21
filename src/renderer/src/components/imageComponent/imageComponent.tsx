import { Skeleton } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ErrorIllustrator from '../illustration/errorIllustrator';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const ImageComponent = ({ src = '', ...props }: ImageProps) => {
  // const [imgSrc, setSrc] = useState(placeholderImg || src);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgStatus, setImgStatus] = useState<{ isLoading: boolean; isError: boolean }>({
    isLoading: true,
    isError: false,
  });

  const onLoad = useCallback(() => {
    setImgStatus({ ...imgStatus, isLoading: false });
  }, [src]);

  const onError = useCallback(() => {
    setImgStatus({ ...imgStatus, isError: false });
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);

  return imgStatus.isLoading ? (
    <Skeleton.Image></Skeleton.Image>
  ) : imgStatus.isError ? (
    <ErrorIllustrator></ErrorIllustrator>
  ) : (
    <img {...props} alt={src} src={src} />
  );
};

export default ImageComponent;
