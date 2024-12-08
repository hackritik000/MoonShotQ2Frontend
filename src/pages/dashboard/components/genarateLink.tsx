import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { generateUrl } from '../queries/queries';

interface UrlListProps {
  url: string;
}

const UrlList: React.FC<UrlListProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Optional: Reset copied state after a delay
  };

  const myurl = window.location.href;
  const refralLink = `${myurl}id/${url}`;

  return (
    <>
      <div className='flex max-w-md w-full text-center mx-5 flex-col'>
      <Input
        className=" rounded-md bg-gray-700 px-3 py-2 text-center text-white outline-none"
        type="text"
        disabled
        value={refralLink}
        placeholder="referal link"
      />
      <p>this link only valid for 1 day</p>
      </div>
      <CopyToClipboard text={refralLink} onCopy={onCopy}>
        <Button size={'lg'}>
          <b>{copied ? 'Copied!' : 'Copy Share Link'}</b>
        </Button>
      </CopyToClipboard>
    </>
  );
};

interface UrlFormProps {
  onAddUrl: (url: string) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onAddUrl }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await generateUrl();
    onAddUrl(url.data.id);
  };

  return <Button onClick={handleSubmit}>Generate New Link</Button>;
};

export const GenerateLink: React.FC = () => {
  const [url, setUrls] = useState('');

  const addUrl = (url: string) => {
    setUrls(url);
  };

  return (
    <div className='flex flex-wrap justify-center gap-2'>
      <UrlForm onAddUrl={addUrl} />
      <UrlList url={url} />
    </div>
  );
};
