'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button } from '@heroui/button';

import { siteConfig } from '@/config/site.config';

export const Logo = () => {
    return <Image src="/logo.png" width={26} height={26} priority alt={siteConfig.title} />;
};

export const Header = () => {
    const pathName = usePathname();

    const getNavItems = () => {
        return siteConfig.navItems.map((navItem) => {
            const isActive = navItem.href === pathName;

            return (
                <NavbarItem key={navItem.id}>
                    <Link
                        color="foreground"
                        href={navItem.href}
                        className={`border border-transparent px-3 py-1 ${isActive ? 'text-blue-500' : 'text-foreground'} transition-colors duration-200 hover:rounded-md hover:border hover:border-blue-300 hover:text-blue-300`}
                    >
                        {navItem.label}
                    </Link>
                </NavbarItem>
            );
        });
    };

    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/" className="flex gap-1">
                    <Logo />
                    <p className="font-bold text-inherit">Татарская кухня</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                {getNavItems()}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
