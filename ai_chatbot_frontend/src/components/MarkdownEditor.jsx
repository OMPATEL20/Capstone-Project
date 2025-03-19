import React from 'react';
import ReactMde from "react-mde";
import ReactMarkdown from 'react-markdown';
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const MarkdownEditor = ({ value, setValue }) => {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({ tables: true });

  return (
    <ReactMde
      value={value}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(<ReactMarkdown children={markdown} />)
      }
    />
  );
};

export default MarkdownEditor;
