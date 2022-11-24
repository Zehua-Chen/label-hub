import React from 'react';

export interface HeadContentProps {
  title?: string;
}

function HeadContent(props: HeadContentProps): JSX.Element {
  const { title } = props;

  return <>{title ? <title>{title}</title> : null}</>;
}

export default HeadContent;
