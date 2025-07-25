export interface SiteHeaderProps {
    name: string;
    navigation?: {
        label: string;
        href: string;
    }[];
}

export default function SiteHeader({name, navigation}: SiteHeaderProps) {
    return (
        <header className="py-2 px-4 w-full bg-(--color-brand-500) text-(--color-header-text)">
            <div
                className="mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between flex-wrap max-w-(--site-max-width)">
                <div className="pr-8">
                    <a href="#" className="flex items-center gap-2">
                        {name}
                    </a>
                </div>

                {navigation && navigation.length > 0 &&
                    <nav className="flex items-center *:no-underline *:p-2 *:rounded-sm grow"
                         aria-label="Main site navigation">
                        {navigation.map(item =>
                            <a key={item.href} href={item.href}
                               className="no-underline px-4 py-2 hover:bg-(--color-support-001) transition rounded-sm">
                                {item.label}
                            </a>)}
                    </nav>}
            </div>
        </header>
    );
}
