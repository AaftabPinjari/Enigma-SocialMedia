import Nav from './Nav';
// import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="bg-gradient-to-br from-blue-300 to-blue-100 p-6 min-w-screen min-h-screen md:max-w-2xl md:mx-auto font-poppins">
            <Nav />
            <main>{children}</main>

        </div>
    )
}