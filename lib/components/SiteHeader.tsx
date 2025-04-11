export interface SiteHeaderProps {
    name: string;
    navigation?: {
        label: string;
        href: string;
    }[];
}

export default function SiteHeader({name, navigation}: SiteHeaderProps) {
    return (
        <header className="p-4 mb-8 w-full bg-blue-800 text-white">
            <div className="mx-auto w-full max-w-[1300px] flex items-center justify-between">
                <div>
                    {name}
                </div>

                {navigation && navigation.length > 0 &&
                    <nav className="flex items-center *:no-underline *:p-2 *:rounded" aria-label="Main site navigation">
                        {navigation.map(item =>
                            <a key={item.href} href={item.href} className="hover:bg-black/20">
                                {item.label}
                            </a>)}
                    </nav>}
            </div>
        </header>
    );
}
