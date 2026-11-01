import { DocumentText, Gallery, MusicSquare, VideoSquare } from 'iconsax-react';
import { type ReactNode } from 'react';

export const fileTypeIcons: { type: string; icon: ReactNode }[] = [
  {
    type: 'mp4',
    icon: <VideoSquare className="h-4 w-4 text-blue-600" />,
  },
  {
    type: 'jpeg',
    icon: <Gallery className="h-4 w-4 text-green-600" />,
  },
  {
    type: 'jpg',
    icon: <Gallery className="h-4 w-4 text-green-600" />,
  },
  {
    type: 'png',
    icon: <Gallery className="h-4 w-4 text-green-600" />,
  },
  {
    type: 'mpeg',
    icon: <MusicSquare className="h-4 w-4 text-red-600" />,
  },
  {
    type: 'mp3',
    icon: <MusicSquare className="h-4 w-4 text-red-600" />,
  },
  {
    type: 'other',
    icon: <DocumentText className="h-4 w-4 text-gray-600" />,
  },
];
