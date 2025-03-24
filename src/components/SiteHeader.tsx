interface IProps {
    siteName: string;
  }

const SiteHeader: React.FC<IProps> = ({siteName}) => {

  return (
    <header className="p-4 mb-8 w-full bg-blue-800 text-white">
        <div className="mx-auto w-full max-w-[1300px] flex items-center justify-between ">
            <div className="">{siteName}</div>
            <nav className="flex items-center *:no-underline *:p-2 *:rounded " aria-label="Main site navigation"> 
                <a href="index.html" className="hover:bg-black/20">Home</a>
                <a href="index.html" className="hover:bg-black/20">Zoeken</a>
                <a href="index.html" className="hover:bg-black/20">Project</a>

            </nav>
        </div>
    </header>
  )
}

export default SiteHeader