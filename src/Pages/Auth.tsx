import { Button, Input } from '@heroui/react'
import { MailIcon, LockIcon } from 'lucide-react'

function Auth() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        //  style={{backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCiT9KAjGwbVWvNBNywvxDi5xcc0P3a3new&s)"}}
        >
            {/* Main container - half width */}
             <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl bg-white backdrop-blur-xl">
                {/* Left Section - Purple */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-900 bg-opacity-70 flex flex-col justify-center p-12 backdrop-blur-md">
                    <h1 className="text-4xl font-bold text-white mb-4">Lyncs Software</h1>
                    <p className="text-indigo-200 mb-8 max-w-md">
                        Lyncs is an intuitive, hassle-free software made in Saudi Arabia.
                    </p>
                    <p className="text-indigo-300 text-sm">
                        © 2025 Lyncs. All rights reserved.<br />
                        Need help? Contact us: <a href="mailto:support@lyncs.sa" className="underline">support@lyncs.sa</a>
                    </p>
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full lg:w-1/2 bg-white/80 backdrop-blur-sm flex items-center justify-center p-12">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold mb-6 text-gray-900">Sign in to your account</h1>

                        <form className="space-y-8">
                            <Input
                                labelPlacement="outside"
                                placeholder="you@example.com"
                                startContent={
                                    <MailIcon className="text-2xl text-gray-400 pointer-events-none shrink-0" />
                                }
                                type="email"
                                defaultValue="qalyncs@gmail.com"
                            />

                            <Input
                                labelPlacement="outside"
                                placeholder="••••••••"
                                startContent={
                                    <LockIcon className="text-2xl text-gray-400 pointer-events-none shrink-0" />
                                }
                                type="password"
                            />

                            <Button color="primary" className="w-full" variant="shadow">
                                Sign In
                            </Button>

                            <div className="text-center mt-4">
                                <a href="#" className="text-gray-600 text-sm font-medium">
                                    Forgot your password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth