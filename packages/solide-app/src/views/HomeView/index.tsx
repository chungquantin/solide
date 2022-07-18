import { Skeleton } from '@mui/material';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {};

const HomeView = (props: Props) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const init = async () => {
      setLoading(true);
      const data = await fetch(
        'https://raw.githubusercontent.com/chungquantin/solide/master/README.md'
      );
      const text = await data.text();
      setContent(text);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <div
      style={{
        textAlign: 'left',
        padding: '0px 50px',
        fontSize: 'larger',
      }}>
      {loading ? (
        <div style={{ marginTop: 50 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ReactMarkdown children={content} />
      )}
    </div>
  );
};

export default HomeView;
