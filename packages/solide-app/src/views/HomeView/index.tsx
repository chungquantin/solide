import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {};

const HomeView = (props: Props) => {
  const [content, setContent] = useState('');

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/chungquantin/solide/master/README.md')
      .then(res => res.text())
      .then(text => setContent(text));
  }, []);

  return (
    <div
      style={{
        textAlign: 'left',
        padding: '0px 50px',
        fontSize: 'larger',
      }}>
      <ReactMarkdown children={content} />
    </div>
  );
};

export default HomeView;
