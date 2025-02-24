"use client";
import {Eye, EyeOff, Lock, Mail, User} from "lucide-react";
import React from "react";

interface SocialButtonProps {
    icon: string;
    ariaLabel: string;
}

interface InputFieldProps {

    type?: string;
    placeholder: string;
    icon: React.FC;
    showPassword?: boolean;
    onTogglePassword?: () => void;
    name: string;
    required?: boolean;
}



const SocialButton: React.FC<SocialButtonProps> = ({icon, ariaLabel}) => (
    <button
        aria-label={ariaLabel}
        className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors duration-300"
    >
        <span className="text-xl">{icon}</span>
    </button>
);

const InputField: React.FC<InputFieldProps> = ({
                                                   type = "text",
                                                   placeholder,
                                                   icon: Icon,
                                                   showPassword,
                                                   onTogglePassword,
                                                   name,
                                                   required = true
                                               }) => (
    <div className="relative transform transition-all duration-300 hover:translate-y-[-2px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-20">
            <Icon />
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            className="w-full pl-10 pr-10 py-3 md:py-2 text-base md:text-sm border border-gray-200 rounded-xl md:rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {onTogglePassword && (
            <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2"
                onClick={onTogglePassword}
            >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
        )}
    </div>
);

interface FormSectionProps {
    isLogin: boolean;
    isVisible: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    onPasswordToggle: () => void;
    onConfirmPasswordToggle: () => void;
    isMobile: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
                         isLogin,
                         isVisible,
                         showPassword,
                         showConfirmPassword,
                         onPasswordToggle,
                         onConfirmPasswordToggle,
                         isMobile
                     }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!isLogin) {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            if (password !== confirmPassword
            ) {
                console.log("Passwords do not match");
                return;
            }
        }
        console.log('Form submitted:', Object.fromEntries(formData));
    };




    const formClasses = isMobile
        ? "w-full"
        : `w-1/2 absolute ${
            isVisible
                ? "translate-x-0 opacity-100 z-10"
                : isLogin
                    ? "translate-x-[-100%] opacity-0 z-0 pointer-events-none"
                    : "translate-x-[100%] opacity-0 z-0 pointer-events-none"
        }`;

    return (
        <div className={`w-full p-6 md:p-8 transition-all duration-700 ease-in-out ${formClasses}`}>
            <h2 className="text-3xl md:text-2xl font-bold mb-8 md:mb-6 text-center md:text-left">
                {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <div className="flex gap-4 mb-8 md:mb-6 justify-center md:justify-start">
                <SocialButton icon="G" ariaLabel="Sign in with Google"/>
                <SocialButton icon="f" ariaLabel="Sign in with Facebook"/>
                <SocialButton icon="in" ariaLabel="Sign in with LinkedIn"/>
            </div>
            <p className="text-gray-500 text-base md:text-sm mb-8 md:mb-6 text-center md:text-left">
                or use your email for {isLogin ? "sign in" : "registration"}
            </p>
            <form className="space-y-6 md:space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                    <InputField
                        icon={User}
                        placeholder="Name"
                        name="name"
                    />
                )}
                <InputField
                    type="email"
                    icon={Mail}
                    placeholder="Email"
                    name="email"
                />
                <InputField
                    type={showPassword ? "text" : "password"}
                    icon={Lock}
                    placeholder="Password"
                    showPassword={showPassword}
                    onTogglePassword={onPasswordToggle}
                    name="password"
                />
                {!isLogin && (
                    <InputField
                        type={showConfirmPassword ? "text" : "password"}
                        icon={Lock}
                        placeholder="Confirm Password"
                        showPassword={showConfirmPassword}
                        onTogglePassword={onConfirmPasswordToggle}
                        name="confirmPassword"
                    />
                )}

                {!isLogin && (
                    <div className="flex items-center justify-between">
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            <input type="checkbox" id="terms" className="mr-2" required />
                            I agree to the terms
                        </label>
                    </div>
                )}

                {isLogin && (
                    <div className="flex items-center justify-between">
                        <label htmlFor="remember" className="text-sm text-gray-600">
                            <input type="checkbox" id="remember" className="mr-2" />
                            Remember me
                        </label>
                    </div>
                )}

                <button
                    className="w-full bg-green-600 text-white py-3 md:py-2 rounded-xl md:rounded-lg text-lg md:text-base font-medium hover:bg-green-700 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                    {isLogin ? "Sign In" : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default function SignIn() {
    const [isLogin, setIsLogin] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            {/* Mobile view */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative z-10 md:hidden">
                <FormSection
                    isLogin={isLogin}
                    isVisible={true}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    onPasswordToggle={() => setShowPassword(!showPassword)}
                    onConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    isMobile={true}
                />
                <div className="text-center pb-6">
                      <span className="text-base text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                      </span>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-base text-green-600 hover:underline font-medium"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>

            {/* Desktop view */}
            <div
                className="hidden md:block bg-white rounded-3xl shadow-xl w-full max-w-4xl h-[500px] overflow-hidden relative z-10">
                <div className="w-full h-full relative">
                    <div
                        className={`absolute justify-center items-center  w-1/2 h-full p-8 flex transition-all duration-700 ease-in-out transform ${
                            isLogin ? "translate-x-0" : "translate-x-[100%]"
                        }`}
                        style={{
                            borderRadius: isLogin ? "3rem 0 0 3rem" : "0 3rem 3rem 0",
                        }}
                    >
                        <FormSection
                            isLogin={isLogin}
                            isVisible={isLogin}
                            showPassword={showPassword}
                            showConfirmPassword={showConfirmPassword}
                            onPasswordToggle={() => setShowPassword(!showPassword)}
                            onConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            isMobile={false}
                        />
                        <FormSection
                            isLogin={false}
                            isVisible={!isLogin}
                            showPassword={showPassword}
                            showConfirmPassword={showConfirmPassword}
                            onPasswordToggle={() => setShowPassword(!showPassword)}
                            onConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            isMobile={false}
                        />
                    </div>

                    <div
                        className={`absolute w-1/2 h-full bg-gradient-to-br from-green-600 to-green-700 text-white p-8 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${
                            isLogin ? "translate-x-full" : "translate-x-0"
                        }`}
                        style={{
                            borderRadius: isLogin ? "3rem 0 0 3rem" : "0 3rem 3rem 0",
                        }}
                    >
                        <h3 className="text-2xl font-bold mb-4 text-center">
                            {isLogin ? "Hello, Friend!" : "Welcome Back!"}
                        </h3>
                        <p className="text-center mb-8 text-gray-100">
                            {isLogin
                                ? "Register with your personal details to use all site features"
                                : "Enter your personal details to use all site features"}
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="border-2 border-white text-white px-8 py-2 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}