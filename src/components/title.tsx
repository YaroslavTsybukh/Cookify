'use client';

import { siteConfig } from '@/config';
import { usePathname } from 'next/navigation';

export const Title = () => {
    const pathname = usePathname();

    const currentNavItem = siteConfig.navItems.find((navItem) => navItem.href === pathname);

    const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

    return (
        <div className="my-6 flex w-full justify-center">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
        </div>
    );
};
