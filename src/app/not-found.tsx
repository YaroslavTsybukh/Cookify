import { Button } from '@heroui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-8xl font-bold text-gray-300">404</div>
            <h1 className="text-3xl font-bold">Страница не найдена</h1>
            <Button className="mt-6" as={Link} color="primary" href="/" variant="shadow">
                Вернуться на главную
            </Button>
        </div>
    );
}
