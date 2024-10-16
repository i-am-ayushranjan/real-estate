export default function Footer() {
    return (
        <footer className='bg-green-900 shadow-md mt-4'>
            <div className='max-w-6xl mx-auto p-3 flex justify-center'>
                <p className='text-sm text-slate-200 text-center'>
                    &copy; {new Date().getFullYear()} Developed by Ayush Ranjan
                </p>
            </div>
        </footer>

    );
}
