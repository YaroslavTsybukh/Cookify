'use client';

import { usePathname } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

import { siteConfig } from '@/config';

export const PageContent = () => {
    const pathName = usePathname();

    const pageContent = siteConfig.pagesContent[pathName as keyof typeof siteConfig.pagesContent];

    if (!pageContent) {
        return <div>{siteConfig.pageNotFound}</div>;
    }

    const cleanCode = DOMPurify.sanitize(pageContent.content);

    return <div>{parse(cleanCode)}</div>;
};
