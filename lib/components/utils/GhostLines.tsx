export default function GhostLines() {
    return (
        <div className="flex flex-col animate-pulse gap-3">
            <div className="w-2/5 bg-support-001 rounded h-4"/>
            <div className="w-3/5 bg-support-001 rounded h-3 opacity-80"/>
            <div className="w-4/5 bg-support-001 rounded h-3 opacity-60"/>
            <div className="w-3/5 bg-support-001 rounded h-3 opacity-40"/>
            <div className="w-4/5 bg-support-001 rounded h-3 opacity-20"/>
            <div className="w-5/5 bg-support-001 rounded h-3 opacity-20"/>
            <div className="w-2/5 bg-support-001 rounded h-3 opacity-20"/>
        </div>
    );
}
