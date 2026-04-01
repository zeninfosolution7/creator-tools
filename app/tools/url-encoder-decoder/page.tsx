import { Metadata } from 'next';
import URLEncoderTool from '@/components/tools/URLEncoderTool';

export const metadata: Metadata = {
  title: 'URL Encoder & Decoder - CreatorTools',
  description: 'Safely encode or decode URLs and parameters. A free, client-side tool for developers and creators.',
  alternates: {
    canonical: 'https://creatortools.co.in/tools/url-encoder-decoder',
  },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          URL Encoder & Decoder
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Need to format a URL for a link or API request? Use this tool to safely encode or decode special characters.
        </p>
        <URLEncoderTool />
      </div>
    </div>
  );
}