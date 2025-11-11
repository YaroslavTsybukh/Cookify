'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button } from '@heroui/button';
import { useShallow } from 'zustand/shallow';

import { layoutConfig, siteConfig } from '@/config';
import { RegistrationModal, LoginModal } from '@/components/modals';
import { useAuthStore } from '@/store';
import { signOutFunc } from '@/actions';

export const Logo = () => {
    return <Image src="/logo.png" width={26} height={26} priority alt={siteConfig.title} />;
};

export const Header = () => {
    const pathName = usePathname();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const { data: session, status } = useSession();
    const [setAuthState, isAuth] = useAuthStore(useShallow((state) => [state.setAuthState, state.isAuth]));

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

    const handleSignOut = async () => {
        try {
            await signOutFunc();
            setAuthState('unauthenticated', null);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };

    useEffect(() => {
        setAuthState(status, session);
    }, [status, session, setAuthState]);

    //TODO: добавить во время загрузки loader
    return (
        <Navbar style={{ height: layoutConfig.headerHeight }}>
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
                {isAuth && <p>Привет, {session?.user?.email}</p>}

                {status === 'loading' ? (
                    <p>Загрузка...</p>
                ) : isAuth ? (
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link} color="primary" variant="flat" href="#" onPress={handleSignOut}>
                            Выйти
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link} color="primary" variant="flat" href="#" onPress={() => setIsLoginOpen(true)}>
                                Логин
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" variant="flat" href="#" onPress={() => setIsRegistrationOpen(true)}>
                                Регистрация
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
        </Navbar>
    );
};
