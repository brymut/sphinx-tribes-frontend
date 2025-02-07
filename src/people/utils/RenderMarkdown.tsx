import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import { colors } from '../../config';

const MarkdownContainer = styled.div<{ textColor?: string }>`
  font-size: 1rem;
  line-height: 1.6;
  color: ${(props: any) => props.textColor || '#3c3f41'};

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
    line-height: 1.4;
  }

  p {
    margin: 1rem 0;
  }

  h1 {
    margin: 0.5rem 0 1rem;
    font-size: 2rem;
  }

  h2 {
    margin: 1.25rem 0 0.75rem;
    font-size: 1.75rem;
  }

  h3,
  h4,
  h5,
  h6 {
    margin: 1rem 0 0.5rem;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }

  th,
  td {
    border: 1px solid #dde1e5;
    padding: 0.8rem;
    text-align: left;
  }

  blockquote {
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 4px solid #dde1e5;
    color: #666;
    font-style: italic;
  }

  pre {
    background-color: #050038;
    color: #ffffff;
    font-family: monospace;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #444;
    margin: 1rem 0;
    overflow-x: auto;
  }

  code {
    color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
`;

interface CustomStyles {
  codeBlockBackground?: string;
  codeBlockFont?: string;
  bubbleTextColor?: string;
  textColor?: string;
  borderColor?: string;
}

export function renderMarkdown(markdown: any, customStyles?: CustomStyles) {
  const color = colors['light'];
  const {
    codeBlockBackground = '#050038',
    codeBlockFont = 'monospace',
    bubbleTextColor = '',
    textColor = '#ffffff',
    borderColor = '#444'
  } = customStyles || {};

  return (
    <MarkdownContainer textColor={bubbleTextColor}>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ className, children, ...props }: any) {
            return (
              <pre
                style={{
                  backgroundColor: codeBlockBackground,
                  color: textColor,
                  fontFamily: codeBlockFont,
                  padding: '1rem',
                  borderRadius: '6px',
                  border: `1px solid ${borderColor}`,
                  margin: '1rem 0',
                  overflowX: 'auto'
                }}
                {...props}
              >
                <code className={className}>{children}</code>
              </pre>
            );
          },
          img({ className, ...props }: any) {
            return (
              <img
                alt="Markdown"
                className={className}
                style={{
                  width: '100%',
                  maxHeight: '100%',
                  border: `1px solid ${color.black80}`,
                  borderRadius: '4px',
                  margin: '0.5rem 0'
                }}
                {...props}
              />
            );
          }
        }}
      />
    </MarkdownContainer>
  );
}
