import React, { useState, useEffect } from 'react';
import { immerable } from 'immer';

export class DownloadContent {
  [immerable] = true;
  public constructor(public readonly content: string) {}

  get blob(): Blob {
    return new Blob([this.content]);
  }
}

export interface DownloadProps {
  content: DownloadContent;
}

function Download(props: DownloadProps): JSX.Element {
  const { content } = props;
  const [downloadURL, setDownloadURL] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(content.blob);
    setDownloadURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [content, setDownloadURL]);

  return (
    <li className='list-group-item'>
      <a href={downloadURL} download='file'>
        Download
      </a>
    </li>
  );
}

export default Download;
