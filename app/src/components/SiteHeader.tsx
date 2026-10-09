export interface SiteHeaderProps {
    name: string;
    navigation?: {
        label: string;
        href: string;
    }[];
}

export default function SiteHeader({name, navigation}: SiteHeaderProps) {
    return (
        <header>
            <div>
                <div className="logo">
                    <a href="#">{name}</a>
                </div>

                {navigation && navigation.length > 0 && <nav aria-label="Main site navigation">
                    {navigation.map((item, idx) => <a key={idx} href={item.href}>
                        {item.label}
                    </a>)}
                </nav>}
            </div>
        </header>
    );
}
