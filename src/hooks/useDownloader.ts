import { useState } from 'react'
import { Method } from 'axios'
import { downloadFile, postSaveFile } from '../download'

interface DownloadConfig {
  url: string,
  method?: Method,
  headers?: Record<string, string>
}

interface DownloadControl {
  (url: string): void
  (config: DownloadConfig): void
}

function useDownloader(config: DownloadConfig) {
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)

  const download = async (localConfig: DownloadConfig) => {
    if (loading) return null
    setLoading(true)
    return downloadFile({
      ...config,
      ...localConfig,
      onProgress: setPercent
    })
      .then(blob => {
        setLoading(false)
        postSaveFile(blob)
        return blob
      })
  }

  const start: DownloadControl = (p1: string | DownloadConfig) => {
    if (typeof p1 === 'string') {
      return download({ url: p1 })
    } else {
      return download(p1)
    }
  }

  return {
    start,
    loading,
    percent
  }
}

export default useDownloader
