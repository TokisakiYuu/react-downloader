import React, { FC, cloneElement, isValidElement } from 'react'
import { downloadFile, postSaveFile } from '../download'
import { Method } from 'axios'

interface Props {
  url: string,
  filename?: string,
  onError?: (err: Error) => void,
  onProgress?: (precent: number) => void,
  onEnd?: (file: Blob) => void,
  method?: Method,
  headers: Record<string, string>
}

const Download: FC<Props> = ({
  children,
  url,
  filename,
  onError,
  onProgress,
  onEnd,
  headers,
  method
}) => {
  const onClick = () => {
    downloadFile({
      url,
      onProgress,
      headers,
      method
    })
      .then(file => {
        onEnd?.(file)
        postSaveFile(file, filename)
      })
      .catch(onError)
  }

  if (!isValidElement(children)) return <>{children}</>

  return cloneElement(children, { onClick })
}

export default Download
