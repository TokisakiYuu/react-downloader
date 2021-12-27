import axios, { Method } from 'axios'

function createBlobURL(file: Blob) {
  return URL.createObjectURL(file)
}

export function postSaveFile(blob: Blob, filename?: string) {
  const anchor = document.createElement('a')
  anchor.href = createBlobURL(blob)
  anchor.setAttributeNode(document.createAttribute('download'))
  if (filename) {
    anchor.setAttribute('download', filename)
  }
  anchor.click()
}

interface DownloadFileConfig {
  url: string,
  onProgress?: (precent: number) => void,
  headers?: Record<string, string>,
  method?: Method
}

export async function downloadFile({
  url,
  headers,
  method,
  onProgress,
}: DownloadFileConfig): Promise<Blob> {
  const response = await axios(url, {
    method: method ?? 'GET',
    responseType: 'blob',
    headers: headers ?? {},
    onDownloadProgress: (e: ProgressEvent) => onProgress?.(e.loaded / e.total)
  })
  return response.data as Blob
}
